# Youtube Top 100

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)]


Youtube Top 100 commenter is javascripts program that is designed for determane the top 100 commenter -for a youtube channel or a specific video- deppending on three factors comments number, total replies for specific commenter and total likes. 

this mini-project handle: 
  - the communacation with the YOUTUEB API.
  - getting data from YOUTUBE API.
  - Managing the the recived data.
  - Save the data to DB file extension using SQLite.
  - Use the saved data to determinate top commenter.

# Features!

  - ability to specify the number of simultaneous request that the program should establish with the YOUTUBE API.
  - the API respnse is optimized using 'flied' attribute.

### Tech

this mini-project use [Node.Js] as JavaScript runtime environment .
the pakeges that this mini-project uses are: 

* axios - Promise based HTTP client for the browser and node.js.
* sqlite3 - awesome web-based text editor
* Firebase-admin - to Authenticate with admin privileges


And of course Youtube Top 100 itself is open source with a public repository
 on GitHub.
 
 
# Costume the project !
>Costume the number of simultaneous Request.

set the max to a vlue between 1 and 50, the default value is 10;
``` JS
//go to "/Tools/API_URL.js"
const maxRequests = 10;
```
>Costume the name of data filename that you want to write to it 

as default the files are saved in the Res folder, if it already dosen't exist than it will be created 
``` js
//go to "/Tools/Write_to_SQLite.js"
const DBfilename = "DATA.db";//File name change it if you want.
const DataBaseFilePath=path.resolve("Res")+"/"+DBfilename;//path
```
# Befor you start 
>set the YOUTUBE API key

you need the API key to establish a succefull request to youtube API;
``` JS
//go to "/Tools/API_URL.js"
const API_Key1 = "AIzaSyBp-sUUbNlI-aCounGzGbvzvlybf_SboAg";//Note:this is an expired Key
```
if you don't know how to get an API key you can check this [link](https://rapidapi.com/blog/how-to-get-youtube-api-key/)
# Result diplay 
![alt text](./consoleDisplay.png)
# Exemple in index.js
