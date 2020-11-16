const API_req = require("./API_req");
const sqlite3 = require('sqlite3').verbose();
const path = require("path");
const DataBaseFilePath=path.resolve("Res")+"/data.db";

// Create a file db
let db = new sqlite3.Database(DataBaseFilePath,sqlite3.OPEN_READWRITE,(err)=>{
    if (err) throw err;
    console.log(DataBaseFilePath + " is found,Connection is Done.")
});

/**
 * this function transform a comment object to SQL Quiery 
 * @param {*} item 
 */
function toQueiry(item){
        let data = item.info;
        //item to SQL script (string) 
        let result="("+"'"+item["commentId"]+ "'" + ","+"'"+data["videoId"]+"'"+ "," + `'${data["textDisplay"]}'` + "," +`"${data["authorDisplayName"]}"`+","+"'"+data["authorProfileImageUrl"]+"'"+","+"'"+data["authorChannelUrl"]+"'"+","+data["likeCount"]+","+Date.parse(data["publishedAt"])+","+data["repliesNbr"]+")"
    return result;
}

/**
 * this function transform a Video object to SQL Quiery 
 * @param {*} item 
 * @param {*} channelId 
 */
function toQueiry2(item,channelId){
    //item to SQL script (string) 
    let result="("+"'" + item["videoId"] + "'" + ","+Date.parse(item["publishedAt"])+","+`'${channelId}'` + ")"
return result;
}

/**
 * send_all_comments_of_one_video_to_sql_File function
 * @param {*} videoId 
 */
async function SACTSF1V(videoId){

    let k=0;//to determine the first iteration in the while loop
    let data;
    let j = 0;
    do{
        if (k==0){
            k++;
            //Get comment 
            data = await API_req.get_comments_page(videoId);
        }
        else{
            data = await API_req.get_comments_page(videoId,data.nextPageToken);
        }
        if ("status" in data){
            return 0
        }
        else{
            let Quiery=toQueiry(data.items[0]);
            for (let i=1;i<data.elementsNbr;i++){
                let item =data.items[i];
                if ("info" in item || item!==undefined){
                    Quiery = Quiery +","+ toQueiry(item);
                }
            }
            db.run("INSERT INTO Comments VALUES "+Quiery,async err=>{
                if (err){
                        console.log(err);
                        //Progress.EN++;
                }
                else{
                        (j++);
                        //Progress.CN=Progress.CN+100;
                }
            });
        }
        
    }
    while(data.nextPageToken !== "")
    console.log(videoId + " Comments:" + (j)*100);
}


/**
 * send_all_comments_of_one_channel_to_sql_File function
 * @param {*} channelId 
 */
async function SACTSF(channelId){
    let t = 0;
    let page;
    let j = 0;

    do {
        if (t==0){
            page =await API_req.get_videos_page(channelId)
            t++;
        }
        else{
            page = await API_req.get_videos_page(channelId,page.nextPageToken);
        }
        console.log(page)
        let Quiery=toQueiry2(page.items[0],channelId);
        for (let i=1;i<page.elementsNbr;i++){
            let item =page.items[i];
            if ("videoId" in item){
                Quiery = Quiery +","+ toQueiry2(item, channelId);
            }
        }
        db.run("INSERT INTO Videos VALUES "+Quiery,async err=>{
            if (err){
                    console.log(channelId + err);
                    //Progress.EN++;
            }
            else{
                    console.log("Number of videos finished for this channel is "+(j++)*page.elementsNbr);
                    //Progress.CN=Progress.CN+100;
            }
        });
        await Promise.all(page.items.map(async (e)=>{
            if ("videoId" in e){
                await SACTSF1V(e.videoId);
            }
        }))
    }while(page.nextPageToken !== "")
    db.close();
}
module.exports = {SACTSF1V,SACTSF}