var chai = require('chai');
var expect = chai.expect;

var options = {
  space: 'cfexampleapi',
  accessToken: 'b4c0n73n7fu1'
};
var contentfulAgent = require('../index.js');

beforeEach(function(){
  request = contentfulAgent(options);
});

describe('contentful-agent', function(){

  it('should return a function', function(){
    expect(contentfulAgent).to.be.a('function');
  });

  it('should throw an error when no options are passed', function(){
    expect(contentfulAgent).to.throw(Error);
  });

  it('should throw an error when no space is passed', function(){
    expect(function(){
      contentfulAgent({ accessToken: 'token' })
    }).to.throw(Error);
  });

  it('should throw an error when no access token is passed', function(){
    expect(function(){
      contentfulAgent({ space: 'space' })
    }).to.throw(Error);
  });

  it('should return an object with a `get` method when valid options are passed', function(){
    var request = contentfulAgent({ space: 'space', accessToken: 'token' });
    expect(request).to.be.an('object');
    expect(request.get).to.be.a('function');
  });

});

describe('request', function(){

  it('should be an object with a `get` method when valid options are passed', function(){
    expect(request).to.be.an('object');
    expect(request.get).to.be.a('function');
  });

  describe('#get', function(){

    it('should return a rejected promise when a content type without id is passed', function(done){
      var contentTypes = {
        cats: {}
      };
      var promise = request.get(contentTypes);
      promise.then(null, function(error){
        done();
      });
    });

    it('should resolve the returned promise with the fetched entries', function(done){
      var contentTypes = {
        cats: {
          id: '63k4qdEi9aI8IQUGaYGg4O'
        },
        dogs: {
          id: 'dog'
        }
      };
      var promise = request.get(contentTypes);
      promise.then(function(entries){
        expect(entries.cats.length).to.be.gt(0);
        expect(entries.dogs.length).to.be.gt(0);
        done();
      });
    });

  });

});
