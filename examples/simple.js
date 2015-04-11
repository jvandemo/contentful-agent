// This example fetches entries from a real Contentful demo space

// Define options to connect to Contentful
var options = {
  space: 'cfexampleapi',
  accessToken: 'b4c0n73n7fu1'
};

// Create agent
var request = require('../index.js')(options);

// Define content types you want to fetch
var contentTypes = {
  cats: {
    id: '63k4qdEi9aI8IQUGaYGg4O',
    filters: {}
  },
  dogs: {
    id: 'dog',
    filters: {}
  }
};

// Make request
request
  .get(contentTypes)
  .then(function(result){
    console.log(result);
  }, function(error){
    console.log(error);
  });
