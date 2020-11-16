const API_Key1 = "AIzaSyBp-sUUbNlI-aCounGzGbvzvlybf_SboAg"
const API_Key = "AIzaSyChAEQXtgkbBUEzCYNcdEcjULQnfSV9hhM"

function get_Url_channels(channelId){
    return 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=' + channelId + '&fields=items.contentDetails.relatedPlaylists.uploads'+'&key=' + API_Key
}

function get_Url_PlaylistItems(playlistId, pageToken=""){
    if (pageToken == ""){
        return 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + playlistId +'&fields=nextPageToken%2C%20items.snippet.resourceId.videoId%2C%20items.snippet.publishedAt' + '&maxResults=10&key=' + API_Key
    }
    return 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + playlistId + '&pageToken='+pageToken+'&fields=nextPageToken%2C%20items.snippet.resourceId.videoId%2C%20items.snippet.publishedAt'+'&maxResults=10&key=' + API_Key
}

function get_Url_commentThreads(videoId,pageToken="") {
    if (pageToken == "" || pageToken == undefined){
        return "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=" + videoId + "&fields=nextPageToken%2Citems.snippet.topLevelComment.etag%2Citems.snippet.topLevelComment.snippet%2Citems.snippet.totalReplyCount%2Citems.replies" + "&maxResults=1000&key=" + API_Key;
    }
    return "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=" + videoId + "&fields=nextPageToken%2Citems.snippet.topLevelComment.etag%2Citems.snippet.topLevelComment.snippet%2Citems.snippet.totalReplyCount%2Citems.replies" + "&pageToken=" + pageToken + "&maxResults=1000&key=" + API_Key;
}

module.exports = {get_Url_channels,get_Url_PlaylistItems,get_Url_commentThreads}