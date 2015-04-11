// Define options to connect to contentful
var options = {
  space: '<contentful-space-id>',
  accessToken: '<contentful-access-token>'
};

// Create agent
var request = require('../index.js')(options);

// Define content types you want to fetch
var contentTypes = {
  'team-members': {
    id: '<contentful-content-type-id>',
    filters: {}
  },
  'links': {
    id: '<contentful-content-type-id>',
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
