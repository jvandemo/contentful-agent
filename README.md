# Contentful agent

Contentful agent is a small Contentful request library that allows you to selectively fetch entries from a Contentful space.

## Installation

```bash
$ npm install contentful-agent
```

## Fetching data

```javascript
// Define options to connect to contentful
var options = {
  space: '<contentful-space-id>',
  accessToken: '<contentful-access-token>'
};

// Create agent
var request = require('contentful-agent')(options);

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
```

## Output

The output is a plain javascript object with the `contentTypes` as keys and their corresponding entries as the values:

```javascript
{
  // All team member entries
  'team-members': [
    { sys: [Object], fields: [Object] },
    { sys: [Object], fields: [Object] },
    { sys: [Object], fields: [Object] },
    { sys: [Object], fields: [Object] }
  ],

  // All links entries
  links: [
    { sys: [Object], fields: [Object] },
    { sys: [Object], fields: [Object] },
    { sys: [Object], fields: [Object] }
  ]
}

```

## License

MIT

## Change log

### 2015-04-11

- Initial (public) version
