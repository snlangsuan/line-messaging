'use strict';
var chai = require('chai');
var should = chai.should();
var LINEBot = require('../');
var request = require('request');
var  app = require('express')();

describe('LINEServerReqestWebhook', function () {
  var options = {
    channelID: '1482333960',
    channelSecret: 'testsecret',
    channelAccessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9/eyJzdWIiOiIyMDAiLCJpc3MiOiJodHRwOlwvXC9lZGNtcy5tb25vaW5mb3N5c3RlbXMuY29tXC9hcGlcL3YxXC9hdXRoXC9sb2dpbiIsImlhdCI6MTQ3NTAzMDc5MiwiZXhwIjoxNDc1MDM0MzkyLCJuYmYiOjE0NzUwMzA3OTIsImp0aSI6IjNkMTlkZjRhOTQ4YzgxNjU2ZTUzMzZlZjVmY2E2YWIwIn0/Fdmehk8h50Aeg5k8yHG9vsNJXvVQGQI5rdpz0rndge8'
  };

  var bot = LINEBot.Client(options);
  app.use(bot.webhook('/webhook'));
  bot.on(LINEBot.Events.MESSAGE, function(replyToken, message) {
    replyToken.should.equal('nHuyWiB7yP5Zw52FIkcQobQuGDXCTA');
    message.isUserEvent().should.be.true;
    message.isGroupEvent().should.be.false;
    message.isRoomEvent().should.be.false;
    message.getUserId().should.equal('U206d25c2ea6bd87c17655609a1c37cb8');
    message.getMessageId().should.equal('325708');
    message.isMessageType('text').should.be.true;
    message.getText().should.equal('Hello, world');
  });
  bot.on(LINEBot.Events.FOLLOW, function(replyToken, message) {
    replyToken.should.equal('nHuyWiB7yP5Zw52FIkcQobQuGDXCTA');
    message.isUserEvent().should.be.true;
    message.isGroupEvent().should.be.false;
    message.isRoomEvent().should.be.false;
    message.getUserId().should.equal('U206d25c2ea6bd87c17655609a1c37cb8');
  });

  before(function () {
    app.listen(8000);
  });

  it('should return 200', function (done) {
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
      },
      {
        "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
        "type": "follow",
        "timestamp": 1462629479859,
        "source": {
          "type": "user",
          "userId": "U206d25c2ea6bd87c17655609a1c37cb8"
        }
      }]
    };
    var signature = 'aXw15BTDYeDJoj43ZLHYvk+acSoTCiUb//kTYKovZSg=';

    request({
      method: 'POST',
      url: 'http://localhost:8000/webhook',
      headers: {
        'Content-Type': 'application/json',
        'X-Line-Signature': signature
      },
      body: JSON.stringify(requestJsonData)
    }, function (error, response, body) {
      response.statusCode.should.equal(200);
      done();
    });
  });
});
