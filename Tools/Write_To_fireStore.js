const API_req = require("./API_req");
const admin = require('firebase-admin')
var serviceAccount = require("../serviceAccountKey2.json");


const App = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore(App)

/**
 * send_all_comments_to_firebase function
 */
async function SACTF(videoId){
    
    var data = await API_req.get_comments_page(videoId);
    let ref = db.collection("channelIdtest3").doc(videoId);
    await ref.set({uploadDate:Date.now()});
    let i;
    elementsNbr=data.elementsNbr;
    for (i=0;i<elementsNbr;i++){
        let e = data.items[i];
        let ref2 = ref.collection("comments").doc(e["commentId"]);
        await ref2.set(e["info"]);
        //await Promise.all(e["replies"].map(async (ele)=>{await ref2.collection("replies").doc(ele["id"]).set(ele["snippet"])}))
    }
    while(data.nextPageToken !== ""){
        data = await API_req.get_comments_page(videoId,data.nextPageToken);
        await Promise.all(data.items.map(async (e)=>{
            let ref2 = ref.collection("comments").doc(e["commentId"]);
            await ref2.set(e["info"]);
            console.log(i++);
        }))
    }
}


module.exports = {SACTF}


/*const firestore =require('./Write_To_fireStore')

const testchannelId = "UCm-qmxF0q6JUGXuyW-SXivQ" //Ultra Beats channel
const testVideoId  = "UdeydZ7qNwo"
//################################### Send data to FireBase(FireStore) ############################################//

//the first thing to know is firebase support 20000 ducument write per day so if you want to use you should do it for small youtube channels with less than 20000 comments due its limits I just make it to get comments from a specific video and not for a whole channel
//if yoou want to try it you should first create a firebase account than a poject in the firebase then search how to download serviceAccountKey.json for you project and past it in the ./Res folder

firestore.SACTF(testVideoId);
*/
