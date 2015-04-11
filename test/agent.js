var chai = require('chai');
var expect = chai.expect;

var options = {
  space: 'cfexampleapi',
  accessToken: 'b4c0n73n7fu1'
};
var contentfulAgent = require('../index.js');

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
