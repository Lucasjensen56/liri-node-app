require("dotenv").config();
var fs = require('fs');

var keys = require('./keys.js');


var twitter = require('twitter');
var client = new twitter(keys.twitter);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);



var liriCommanLine = (process.argv[2]);


// multiple word intakes

// var blankWord = "";

// for (var i = 3; i < song; i++) {
//   if (i > 3 && i < song.length) {
//     blankWord = blankWord + "+" + song[i];
//   } else {
//     blankWord += song[i];
//   }
// }




// function to display tweets
function displayTweets () {

  var screenName = {screen_name: 'jensen_lucas'};

  client.get('statuses/user_timeline', screenName, function(error, tweets, response) {
      if(error) throw error;
      // console.log(tweets);  // The favorites. 
      // console.log(response);  // Raw response object. 
      for (i = 0; i < tweets.length; i++) {
        console.log("@jensen_lucas: " + tweets[i].text + "created: " + tweets[i].created_at.substring(0,19));
        console.log("-------------------------")

        fs.appendFile('searchLog.txt', '@jensen_lucas: ' + tweets[i].text + 'created: ' + tweets[i].created_at.substring(0,19), function(error) {
          if (error) {
            return console.log(error)
          }
        });
        fs.appendFile('searchLog.txt', '---------------------------' + "\n")
      }

    });
    
   
};


function searchSpotify() {

  var song = (process.argv[3]);

  // var song = process.argv;

  // console.log(song)
  

  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {

        // var songData = (JSON.stringify(data, null, 2));
        // var songData = (JSON.stringify(data.tracks.items, null, 2));
        var songDataAPi = data.tracks.items;

        // console.log(songDataAPi)

        for (i = 0; i < songDataAPi.length; i++) {

          var songData = (data.tracks.items[i]);


          console.log('Artist: ' + songData.artists[0].name + "\n" +
            'Song: ' + songData.name + "\n" +
            'Preview Link: ' + songData.preview_url + "\n" +
            'Album ' + songData.album.name +
          "\n" + "------------");
          
          
        
          // console.log(songData[i].artists[0].name); 
        
        
        // fs.appendFile('searchLog.txt', songData[i].artists[0].name, function(error) {
        //   if (error) {
        //     return console.log(error)
        //   }
        // });
        
        };
    }


  });


};

switch(liriCommanLine) {
  case"my-tweets":
    displayTweets();
  break;
  case"spotify-this-song":
    searchSpotify();
  break;



};


