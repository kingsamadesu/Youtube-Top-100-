const { Resolver } = require("dns");
const File = require("fs");
const sqlite3 = require('sqlite3').verbose();
const path = require("path");

/**
 * this function prints 100 commenters info in table, those results are sorted by the three option,
 * @param {*} databaseName the name of the db file in 'Res' folder
 * @param {*} sortOption is sort options for the 100 result either by sorting them by the total number of replies or total number of likes or total number comments.its can take three values witch are: 'NbrOflike','NbrOfComments' and NbrOfreplies By defaul it is set to "NbrOflike"
 */
async function Top_100(databaseName,sortOption="NbrOflike"){
    if(["NbrOflike","NbrOfreplies","NbrOfComments"].includes(sortOption)){
        let Path = path.resolve("Res")+"/"+databaseName;//path
        let file = File.existsSync(Path);
        if(file){
            let db =new sqlite3.Database(Path,(err)=>{
                if (err) throw err;
                console.log(`connection establisshed with ${databaseName}`);
            });
            let sql = `
            SELECT authorDisplayName,authorChannelUrl,Count(Comments.authorDisplayName) as NbrOfComments, SUM(Comments.likeCount) as NbrOflike, SUM(Comments.repliesNbr) as NbrOfreplies from Comments
            GROUP BY Comments.authorDisplayName
            ORDER BY ${sortOption} DESC
            LIMIT 100
            `
            db.all(sql, [], (err, rows) => {
                if (err) {
                  throw err;
                }
                console.table(rows)
              });
            db.close()
    
        }else{
            console.log(`No existing file with that name ${databaseName} in the "Res" folder `)
        }
    }else{
        console.log(`No such sortOption like ${sortOption}`)
    }
  
    

}
module.exports = {Top_100}