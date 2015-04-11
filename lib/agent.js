// Don't require if you've already included contentful as a script tag
var contentful = require('contentful');
var _ = require('lodash');
var when = require('when');

module.exports = request;

var client = null;
var options = {
  space: '',
  accessToken: '',
  secure: true,
  host: 'cdn.contentful.com'
};
var response = {};

function request(options) {
  if (!options.space) {
    throw new Error('Missing required option. Please make sure `space` is present');
  }
  if (!options.accessToken) {
    throw new Error('Missing required option. Please make sure `accessToken` is present');
  }
  return new Request(options);
}

function Request(opts) {
  options = _.merge(options, opts);
  client = contentful.createClient({
    space: options.space,
    accessToken: options.accessToken,
    secure: options.secure,
    host: options.host
  });
}

/**
 * Make request
 *
 * @param contentTypes
 * @returns {Promise}
 */
Request.prototype.get = function (contentTypes) {
  return prepareResults(contentTypes)
    .then(fetchEntries)
    .yield(response);
};

/**
 * Get all content types
 *
 * @param contentTypes
 * @returns {Promise}
 */
Request.prototype.getContentTypes = function () {
  return client.contentTypes();
};

/**
 * Convert object with content types to array with content types
 *
 * FROM: { 'team-members': { id: '', filters: {} } }
 * TO: [ { id: '', filters: {}, name: 'team-members' } ]
 *
 * @param contentTypes
 * @returns {*}
 */
function prepareResults(contentTypes) {
  var results = _.reduce(contentTypes, function (result, contentType, key) {

    // If content type is string, treat is as content type id
    if(_.isString(contentType)){
      var id = contentType;
      contentType = {
        id: id
      }
    }
    contentType.name = key;
    result.push(contentType);
    return result;
  }, []);
  return when.resolve(results);
};

/**
 * Fetch entries from contentful
 *
 * @param contentTypes [ { id: '', filters: {}, name: 'team-members' } ]
 */
function fetchEntries(contentTypes) {
  return when.map(contentTypes, function (contentType) {
    if (!contentType.id) {
      return when.reject('Content type `' + contentType.name + '` is missing an `id` value');
    }
    var filters = _.merge(contentType.filters, {content_type: contentType.id});
    return client.entries(filters).then(function (results) {
      response[contentType.name] = results;
    });
  });
};
