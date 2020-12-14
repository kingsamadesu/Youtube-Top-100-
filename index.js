const WriteToSQLite = require(".Tools/Write_to_SQLite");
const TOP_100_commenters = require(".Tools/TOP_100_commenters");

const testchannelId = "UCm-qmxF0q6JUGXuyW-SXivQ";//Ultra Beats channel
const testVideoId  = "UdeydZ7qNwo";
const filename = "data.db";//

//################################### Save data in Sqlite file ############################################//
//the data will be automatically saved at the file data.db in 'Res' folder you can save to another file by changing the varaible DBfilename in this path './Tools/Write_to_SQLite.js' but allways it will be saved at 'Res' folder
//to get comments of one video
WriteToSQLite.SACTSF1V(testVideoId);
//to get comments of a whole channel
WriteToSQLite.SACTSF(testchannelId)

//################################### Top_100_comments ############################################//

// after having db file saved and full of data in you "Res" folder past the name of this file as parameter


const sortOption = "NbrOfComments";//for the 100 result you can sort them by the total number of replies or total number of likes or total number comments.its can take three values witch are: 'NbrOflike','NbrOfComments' and NbrOfreplies By defaul it is set to "NbrOflike"
TOP_100_commenters.Top_100(filename,sortOption)
