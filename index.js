const API_URLs=require("./Tools/API_URLs");
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
        let Api_items = data["items"];delete data.items;
        if ('nextPageToken' in data){
            nextPageToken = req["nextPageToken"];
        }
        for (e in Api_items){
            let i = Api_items[e];
            items.push({'videoId': i['snippet']["resourceId"]['videoId'], "publishedAt": i['snippet']["publishedAt"]})
            elementsNbr += 1
        }
        return {'elementsNbr': elementsNbr, 'nextPageToken': nextPageToken,
        'items': items}  // we can define it as a class named videos_page
    }
    catch (e){
        console.log("er");
        return {'elementsNbr': elementsNbr, 'nextPageToken': nextPageToken,
        'items': items}
    }

    //let Api_items = Data['items'];
   
}
get_videos_page('UCm-qmxF0q6JUGXuyW-SXivQ');

