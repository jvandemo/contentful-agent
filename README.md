# Contentful agent

Contentful agent is a small library that allows you to selectively fetch entries from a Contentful space.

## Installation

```bash
$ npm install contentful-agent
```

## How it works

Contentful agent only exposes one method `get()` that you can use to fetch data:

```javascript
// Define options to connect to contentful
var options = {
  space: '<contentful-space-id>',
  accessToken: '<contentful-access-token>'
};

// Create agent and pass connection options
var request = require('contentful-agent')(options);

// Define content types you want to fetch
var contentTypes = {
  dogs: {
    id: '<contentful-content-type-id>',
    filters: {}
  },
  cats: {
    id: '<contentful-content-type-id>',
    filters: {}
  }
};

request

  // Use `get` to make the request
  .get(contentTypes)
  
  // Returns a promise
  .then(
  
    // Success handler receives requested entries
    function(response){
      console.log(response);
    },
    
    // Error handler receives error in case something went wrong
    function(error){
      console.log(error);
    }
  );
  
// => response in success handler:
// {
//   dogs: [
//     { sys: [Object], fields: [Object] },
//     { sys: [Object], fields: [Object] },
//     { sys: [Object], fields: [Object] },
//     { sys: [Object], fields: [Object] }
//   ],
//   cats: [
//     { sys: [Object], fields: [Object] },
//     { sys: [Object], fields: [Object] },
//     { sys: [Object], fields: [Object] }
//   ]
// }
```

## Returns

A call to `.get()` returns a promise that is eventually resolved with a plain javascript object containing the `contentTypes` as keys and their corresponding entries as the values:

```javascript
{
  // All dog entries
  dogs: [
    { sys: [Object], fields: [Object] },
    { sys: [Object], fields: [Object] },
    { sys: [Object], fields: [Object] },
    { sys: [Object], fields: [Object] }
  ],

  // All cat entries
  cats: [
    { sys: [Object], fields: [Object] },
    { sys: [Object], fields: [Object] },
    { sys: [Object], fields: [Object] }
  ]
}
```

## Filters

Each content type accepts a `filters` key where you can specify (multiple) powerful filters to narrow down the entries:

```javascript
// Define content types you want to fetch
var contentTypes = {
  'dogs-and-cats': {
    id: '<contentful-content-type-id>',
    filters: {
      'fields.type[in]': ['dog', 'cat']
    }
  },
  'birds-and-trees': {
    id: '<contentful-content-type-id>',
    filters: {
      'fields.type[in]': ['bird', 'tree']
    }
  }
};
```

Check out the [official Contentful filters documentation](https://www.contentful.com/developers/documentation/content-delivery-api/#search-filter) for all possible options.

## License

MIT

## Change log

### 2015-04-11

- Initial (public) version
