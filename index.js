const API_URLs=require("./Tools/API_URLs");
const axios = require('axios');

async function get_upload_playlist(channelId) {
    let url = API_URLs.get_Url_channels(channelId);
    let req = await axios.get(url);
    console.log(req.data['items'][0]['contentDetails']['relatedPlaylists']['uploads']);
}
get_upload_playlist("UCIPPMRA040LQr5QPyJEbmXA");