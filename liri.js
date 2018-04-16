require("dotenv").config();
var fs = require('fs');

var keys = require('./keys.js');

var twitter = require('twitter');
var client = new twitter(keys.twitter);





var liriCommanLine = (process.argv[2]);


function displayTweets () {

  var screenName = {screen_name: 'jensen_lucas'};

  client.get('statuses/user_timeline', screenName, function(error, tweets, response) {
      if(error) throw error;
      // console.log(tweets);  // The favorites. 
      // console.log(response);  // Raw response object. 
      for (i = 0; i < tweets.length; i++) {
        console.log("@jensen_lucas: " + tweets[i].text + "created: " + tweets[i].created_at.substring(0,19));
        console.log("-------------------------")

    }


    });

    


  fs.appendFile('twitterLog.txt', )

}

displayTweets()





// twitter

// client.get(path, params, callback);




// // 
// GET https://api.twitter.com/1.1/statuses/lookup.json?id=20,432656548536401920

