const API_URLs=require("./API_URLs");
const axios = require('axios');

async function get_upload_playlist(channelId) {
    let url = API_URLs.get_Url_channels(channelId);
    let req = await axios.get(url);
    return req.data['items'][0]['contentDetails']['relatedPlaylists']['uploads'];
}

async function get_videos_page(channelId, pageToken=''){
    try{
        let items = [];
        let nextPageToken="";
        let elementsNbr=0
        let playlistId = await get_upload_playlist(channelId);
        let url = API_URLs.get_Url_PlaylistItems(playlistId, pageToken);
        let req = await axios.get(url);
        let data = req.data;
        let Api_items = data["items"];
        if ('nextPageToken' in data){
            nextPageToken = data["nextPageToken"];
        }
        for (e in Api_items){
            let i = Api_items[e];
            items.push({'videoId': i['snippet']["resourceId"]['videoId'], "publishedAt": i['snippet']["publishedAt"]});
            elementsNbr += 1
        }
        return {'elementsNbr': elementsNbr, 'nextPageToken': nextPageToken,'items': items}  // we can define it as a class named videos_page
    }
    catch (e){
        console.log("er");
        return {status:"error"};
    }
   
}

function RemoveAttr(obj) {
    delete obj.videoId;
    delete obj.textOriginal;
    delete obj.authorChannelUrl;
    delete obj.canRate;
    delete obj.viewerRating
    delete obj.updatedAt
    return obj
}
//,authorDisplayName,authorProfileImageUrl,authorChannelId,likeCount,a.publishedAt

async function get_comments_page(videoId, pageToken=''){
    try{
        let items = [];
        let nextPageToken="";
        let elementsNbr=0;
        let url = API_URLs.get_Url_commentThreads(videoId, pageToken);
        let req = await axios.get(url);
        let data = req.data;
        let Api_items = data["items"];

        if ('nextPageToken' in data){
            nextPageToken = data["nextPageToken"];
        }   
        for (e in Api_items){
            let i = Api_items[e];
            elementsNbr += 1;
            let info = i["snippet"]["topLevelComment"]["snippet"];
            info["repliesNbr"] = i["snippet"]["totalReplyCount"];
            items.push({"commentId":i["snippet"]["topLevelComment"]["etag"],"info":info,});
            //items.push({"commentId":i['id'],"info":info,"replies":('replies' in i)?i["replies"]["comments"]:[]});
        }
        return {'elementsNbr': elementsNbr, 'nextPageToken': nextPageToken,'items': items}  // we can define it as a class named videos_page

    }
    catch (e){
        console.log("er");
        return {status:"error"}
    }
   
}

module.exports = {get_videos_page,get_comments_page,get_upload_playlist}