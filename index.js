const API_URLs=require("./Tools/API_URLs");
const axios = require('axios');


async function get_comments_page(videoId, pageToken=''){
    try{
        let url = API_URLs.get_Url_commentThreads(videoId, pageToken);
        let req = await axios.get(url).catch(e=>console.log("e"));
        console.log(req);
    }
    catch (e){
        console.log("req");
    }
   
}



get_comments_page("ppX9FOSLVfw");

