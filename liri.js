require("dotenv").config();

var Twitter = require('twitter');




// twitter

client.get(path, params, callback);

client.get('favorites/list', function(error, tweets, response) {
  if(error) throw error;
  console.log(tweets);  // The favorites. 
  console.log(response);  // Raw response object. 
});


// 
GET https://api.twitter.com/1.1/statuses/lookup.json?id=20,432656548536401920

