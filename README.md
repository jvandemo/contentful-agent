# Contentful agent

[![Build Status](https://travis-ci.org/jvandemo/angular-contentful.svg?branch=master)](https://travis-ci.org/jvandemo/angular-contentful)

Contentful agent is a lightweight module to fetch entries from a [Contentful](https://www.contentful.com) space:

- returns a promise for easy asynchronous handling
- supports powerful filters to filter by entry fields

## Installation

```bash
$ npm install contentful-agent
```

## Quick example

```javascript
// Create agent
var request = require('contentful-agent')({
  space: 'cfexampleapi',
  accessToken: 'b4c0n73n7fu1'
});

// Get all entries with content type 63k4qdEi9aI8IQUGaYGg4O
// and store them as cats in the response
var promise = request.get({ cats: '63k4qdEi9aI8IQUGaYGg4O' });

promise.then(function(entries){
  console.log(entries.cats);
});

// Get multiple types of entries in one request
promise = request.get({
  cats: '63k4qdEi9aI8IQUGaYGg4O',
  dogs: '6kdskjfjIQHFnkqdnsq23O'
});

promise.then(function(entries){
  console.log(entries.cats);
  console.log(entries.dogs);
});

// Use powerful filters to filter the results
promise = request.get({
  cats: {
    id: '63k4qdEi9aI8IQUGaYGg4O',
    filters: {
      'fields.type[in]': ['persian', 'belgian']
    }
  }
});

promise.then(function(entries){
  console.log(entries.cats);
});

```

## API

### .get(contentTypes)

#### Arguments

- **contentTypes**: `Object`

The `contentTypes` object is a key value map of entries you want to fetch, where each

- `key`: represent the `key` in the response object the fetched entries will be stored in
- `value`: represents the entries you wish to fetch

Values can be either a `string`:

```javascript
// Fetch all entries with content type id 63k4qdEi9aI8IQUGaYGg4O
// and store them in the `cats` property
request.get({
  cats: '63k4qdEi9aI8IQUGaYGg4O'
});
```

 or an `object`:

```javascript
// Fetch all entries with content type id 63k4qdEi9aI8IQUGaYGg4O
// and store them in the `cats` property
request.get({
  cats: {
    id: '63k4qdEi9aI8IQUGaYGg4O'
  }
});

// Fetch all entries with content type id 63k4qdEi9aI8IQUGaYGg4O
// and type persian or belgian and store them in the `cats` property
request.get({
  cats: {
    id: '63k4qdEi9aI8IQUGaYGg4O',
    filters: {
      'fields.type[in]': ['persian', 'belgian']
    }
  }
});

```

#### Returns

*Promise*: a call to `.get()` returns a promise that is eventually resolved with a plain javascript object containing the `contentTypes` as keys and their corresponding entries as the values:

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
  'dogsAndCats': {
    id: '<contentful-content-type-id>',
    filters: {
      'fields.type[in]': ['dog', 'cat']
    }
  },
  'birdsAndTrees': {
    id: '<contentful-content-type-id>',
    filters: {
      'fields.type[in]': ['bird', 'tree']
    }
  }
};

var promise = request.get(contentTypes);

promise.then(function(entries){
  console.log(entries.dogsAndCats);
  console.log(entries.birdsAndTrees);
};
```

Check out the [official Contentful filters documentation](https://www.contentful.com/developers/documentation/content-delivery-api/#search-filter) for all possible options.

## License

MIT

## Change log

### 1.1.0

- Added support for string content types
- Updated example
- Updated documentation

### 1.0.0

- Bumped version because used in production

### 0.2.0

- Added unit tests
- Added filter support
- Updated documentation

### 0.1.0

- Initial version
