const API_URLs=require("./API_URLs");
const requests = require('request');

function get_upload_playlist(channelId) {
    let url = API_URLs.get_Url_channels(channelId)
    let req = requests.get(url)
    if (req.status_code != 200){
        return -1
    }
    return req.json()['items'][0]['contentDetails']['relatedPlaylists']['uploads']
}


function get_videos_page(playlistId, pageToken=''){
    let items = []
    let elementsNbr = 0
    let nextPageToken = ''
    let url = get_Url_PlaylistItems(playlistId, pageToken)
    if (pageToken != ''){
        url = url + '&pageToken=' + pageToken
    }
    let req = requests.get(url).json()
    let Api_items = req.pop('items', None)
    if ("nextPageToken" in req){
        nextPageToken = req["nextPageToken"]
    }
    for (i in Api_items){
        items.append({'videoId': i['snippet']["resourceId"]['videoId'], "publishedAt": i['snippet']["publishedAt"]})
        elementsNbr += 1
    }
    return {'elementsNbr': elementsNbr, 'nextPageToken': nextPageToken,
        'items': items}  // we can define it as a class named videos_page

}

console.log(get_upload_playlist("UCkQ62tvPlVVb2WLppjRfPdQ"))