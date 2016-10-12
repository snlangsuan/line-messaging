'use strict';
var chai = require('chai');
var should = chai.should();

var Event = require('../lib/linebot/event');
var TextMessage = require('../lib/linebot/event/message/text.message');
var FollowEvent = require('../lib/linebot/event/follow.event');

describe('ParseEventRequest', function() {
  it('should be able to create receives from json', function(done) {
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

    var receives = Event.parseEventRequest(requestJsonData, options.channelSecret, signature);

    receives.should.be.an.instanceof(Array).that.has.lengthOf(2);

    receives[0].should.be.an.instanceof(TextMessage);
    receives[0].getType().should.equal('message');
    receives[0].isType('message').should.be.true;
    receives[0].getTimestamp().should.equal(1462629479859);
    receives[0].getReplyToken().should.equal('nHuyWiB7yP5Zw52FIkcQobQuGDXCTA');
    receives[0].isUserEvent().should.be.true;
    receives[0].isGroupEvent().should.be.false;
    receives[0].isRoomEvent().should.be.false;
    receives[0].getUserId().should.equal('U206d25c2ea6bd87c17655609a1c37cb8');
    receives[0].getMessageId().should.equal('325708');
    receives[0].isMessageType('text').should.be.true;
    receives[0].getText().should.equal('Hello, world');

    receives[1].should.be.an.instanceof(FollowEvent);
    receives[1].isType('follow').should.be.true;
    receives[1].getTimestamp().should.equal(1462629479859);
    receives[1].isUserEvent().should.be.true;
    receives[1].isGroupEvent().should.be.false;
    receives[1].isRoomEvent().should.be.false;
    receives[1].getUserId().should.equal('U206d25c2ea6bd87c17655609a1c37cb8');

    done();
  });
});
