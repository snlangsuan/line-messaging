'use strict';
var chai = require('chai');
var should = chai.should();

var SignatureValidator = require('../lib/linebot/signature.validator');

describe('SignatureValidator', function() {
  var options = {
    channelID: '1482333960',
    channelSecret: 'testsecret'
  };

  var requestJsonData = {
    "events": [{
      "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
      "type": "message",
      "timestamp": 1462629479859,
      "source": {
         "type": "user",
         "userId": "U206d25c2ea6bd87c17655609a1c37cb8"
       },
       "message": {
         "id": "325708",
         "type": "text",
         "text": "Hello, world"
        }
    }]
  };

  var rawJson = JSON.stringify(requestJsonData);
  var signature = 'JEjX+EqsFc2/xQqx59oQfje61hzBiQ8KlYOMIo25lEs=';

  it('should be able to validate signature', function(done) {
    SignatureValidator.validateSignature(rawJson, options.channelSecret, signature).should.be.true;
    SignatureValidator.validateSignature(rawJson, options.channelSecret, 'XXX').should.be.false;
    done();
  });
});
