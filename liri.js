require("dotenv").config();
var fs = require('fs');

var keys = require('./keys.js');


var twitter = require('twitter');
var client = new twitter(keys.twitter);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var song = (process.argv[3]);

var request = require('request');

// var array = [];
// for (i = 2; i < process.argv.length; i++) {

//   var stringifyResults = JSON.stringify(process.argv[i]);
//   console.log(stringifyResults)
//   var str = array.join(' ')
//   console.log(str);
//   // array.push(stringifyResults);
//   // console.log(array);

//   // var str = array.join(' ');
//   // console.log(str);


//   // var song1 = (process.argv[i]);
// }



var liriCommanLine = (process.argv[2]);


// function to display tweets
function displayTweets () {

  var screenName = {screen_name: 'jensen_lucas'};

  client.get('statuses/user_timeline', screenName, function(error, tweets, response) {
      if(error) throw error;
      for (i = 0; i < tweets.length; i++) {
        console.log("@jensen_lucas: " + tweets[i].text + "created: " + tweets[i].created_at.substring(0,19));
        console.log("-------------------------")

        fs.appendFile('searchLog.txt', '@jensen_lucas: ' + tweets[i].text + 'created: ' + tweets[i].created_at.substring(0,19) + '\n', function(error) {
          if (error) {
            return console.log(error)
          }
        });
        fs.appendFile('searchLog.txt', '--------------------------------------------' + '\n')
      }
    });
};

function searchSpotify(song1) {

  song1 = (process.argv[3])

  if (song1 === undefined) {
    song1 = "Ace of Base";
  }

  // song1 = (process.argv[3] + " " + process.argv[4])


  // console.log(song1)

  spotify.search({ type: 'track', query: song1 }, function(err, data) {
    
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
        var songDataAPi = data.tracks.items;

        for (i = 0; i < songDataAPi.length; i++) {
            var songData = (data.tracks.items[i]);

            console.log('Artist: ' + songData.artists[0].name + "\n" +
              'Song: ' + songData.name + "\n" +
              'Preview Link: ' + songData.preview_url + "\n" +
              'Album: ' + songData.album.name + "\n" + 
              "----------------------");
                  
          fs.appendFile('searchLog.txt', 
          'Artist: ' + songData.artists[0].name + "\n" +
          'Song: ' + songData.name + "\n" +
          'Preview Link: ' + songData.preview_url + "\n" +
          'Album: ' + songData.album.name + "\n" + 
          "--------------------------------------------------------" + "\n", 
        function(error) {
          if (error) {
            return console.log(error)
          } 

        });
        
        };
    } 


  });

};



function showMovie() {


  var movie = (process.argv[3] + " " + process.argv[4]);
  var blankmovie1 = (process.argv[3]);

  if (blankmovie1 === undefined) {
    movie = "Mr. Nobody";

  };

  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      var movieData = (JSON.parse(body))

      // console.log(movieData)

      console.log('Movie Title: ' + movieData.Title + '\n' +
                  'Release Date: ' + movieData.Year + '\n' +
                  'imdbRating: ' + movieData.imdbRating + '\n' +
                  'Rotten Tomatoes Rating: ' + movieData.Ratings[1].Value + '\n' +
                  'Country where movie was filmed: ' + movieData.Country + '\n' +
                  'Language: ' + movieData.Language + '\n' +
                  'Plot: ' + movieData.Plot + '\n' + 
                  'Actors: ' + movieData.Actors + '\n')

      fs.appendFile('searchLog.txt', 
          
        'Movie Title: ' + movieData.Title + '\n' +
        'Release Date: ' + movieData.Year + '\n' +
        'imdbRating: ' + movieData.imdbRating + '\n' +
        'Rotten Tomatoes Rating: ' + movieData.Ratings[1].Value + '\n' +
        'Country where movie was filmed: ' + movieData.Country + '\n' +
        'Language: ' + movieData.Language + '\n' +
        'Plot: ' + movieData.Plot + '\n' + 
        'Actors: ' + movieData.Actors + '\n' +
        "----------------------------------------------------------" + '\n', 
        function(error) {

        });

    } else if (error) {
      return console.log(error)
    } 


  });

};

function doWhatItSays () {

  fs.readFile("random.txt", "utf8", function(err, data){
    if (err) {
      return console.log(err);
    } else {
      
      var searchWord = data.split(',')

      console.log(searchWord)

      searchSpotify(searchWord[1])

    }


  });


}





switch(liriCommanLine) {
  case"my-tweets":
    displayTweets();
  break;
  case"spotify-this-song":
    searchSpotify(song);
  break;
  case"movie-this":
    showMovie();
  break;  
  case"do-what-it-says":
    doWhatItSays();
  break

  default:
    console.log("{Incorrect command, please enter one of the following: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
    break;
};


