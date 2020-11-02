const API_Key1 = "AIzaSyBp-sUUbNlI-aCounGzGbvzvlybf_SboAg"
const API_Key = "AIzaSyChAEQXtgkbBUEzCYNcdEcjULQnfSV9hhM"

function get_Url_channels(channelId){
    return 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=' + channelId + '&key=' + API_Key
}

function get_Url_PlaylistItems(playlistId, pageToken=""){
    if (pageToken == ""){
        return 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + playlistId +'&maxResults=50&key=' + API_Key
    }
    return 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + playlistId + '&pageToken='+pageToken+'&maxResults=50&key=' + API_Key
}

function get_Url_commentThreads(videoId,pageToken="") {
    if (pageToken == ""){
        return "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=" + videoId + "&maxResults=100&key=" + API_Key;
    }
    return "https://www.googleapis.com/youtube/v3/commentThreads?part=  &videoId=" + videoId + "&pageToken=" + pageToken + "&maxResults=100&key=" + API_Key;
}

module.exports = {get_Url_channels,get_Url_PlaylistItems,get_Url_commentThreads}