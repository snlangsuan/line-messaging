var Client = require('./linebot/client');
var Event = require('./linebot/event');
var Message = require('./linebot/message');
var BaseEvent = require('./linebot/event/base.event');
var SignatureValidator = require('./linebot/signature.validator');

var TextMessage = require('./linebot/message/text.message');
var ImageMessage = require('./linebot/message/image.message');
var AudioMessage = require('./linebot/message/audio.message');
var VideoMessage = require('./linebot/message/video.message');
var LocationMessage = require('./linebot/message/location.message');
var StickerMessage = require('./linebot/message/sticker.message');
var MultiMessage = require('./linebot/message/multi.message');

var util = require('util');
var EventEmitter = require('events').EventEmitter;


function Bot (client, options) {
  console.log(!(client instanceof Client))
  if (!(client instanceof Client)) throw new Error('Client is not defined');
  if (!options['channelSecret']) throw new Error('channel secret is not defined');

  var that = this;
  var channelSecret = options['channelSecret'];
  const DEFAULT_ENDPOINT_BASE = 'https://api.line.me';
  if ( !options ) options = {};
  var endpointBase = ( !options['endpointBase'] )? DEFAULT_ENDPOINT_BASE: options['endpointBase'];
  var version = (!options['version']) ? 'v2' : options['version'];

  for ( var i in options ) {
    this[i] = options[i];
  }

  this.set = function (key, value) {
    this[key] = value;
  }

  this.get = function (key) {
    return that[key];
  }

  this.webhookRequest = function (req, res) {
    console.log('webhook request');
    var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body);//.toString();
      if ( !body ) return;
      // var json = JSON.parse(body);

      var headers = req.headers;
      var signature = headers['x-line-signature'];

      that.handleEventRequest(body, signature);
    });

    res.end();
  }

  this.webhook = function (route) {
    that.route = route;

    return function (req, res, next) {
      if (req.url == that.route && req.method == 'POST') {
        that.webhookRequest(req, res);
      } else {
        next();
      }
    }
  }

  this.getHeaderSignature = function(req) {
    return req.get('X-Line-Signature');
  }

  this.getProfile = function(userId) {
    return client.get(endpointBase + '/' + version + '/bot/profile/' + encodeURIComponent(userId));
  }

  this.getMessageContent = function(messageId) {
    return client.get(endpointBase + '/' + version + '/bot/message/' + encodeURIComponent(messageId) + '/content', null);
  }

  this.replyMessage = function(replyToken, messageBuilder) {
    return client.post(endpointBase + '/' + version + '/bot/message/reply', {
      replyToken: replyToken,
      messages: messageBuilder.buildMessage()
    });
  }

  this.replyJsonMessage = function(json) {
    return client.post(endpointBase + '/' + version + '/bot/message/reply', json);
  }

  this.replyTextMessage = function(replyToken, text) {
    var extraTexts = Array.prototype.slice.call(arguments, 2);
    var messageBuilder = new TextMessage();
    extraTexts.unshift(text);
    TextMessage.apply(messageBuilder, extraTexts);
    return that.replyMessage(replyToken, messageBuilder);
  }

  this.replyImageMessage = function(replyToken, originalContentUrl, previewImageUrl) {
    var messageBuilder = new ImageMessage(originalContentUrl, previewImageUrl);
    return that.replyMessage(replyToken, messageBuilder);
  }

  this.replyAudioMessage = function(replyToken, originalContentUrl, duration) {
    var messageBuilder = new AudioMessage(originalContentUrl, duration);
    return that.replyMessage(replyToken, messageBuilder);
  }

  this.replyLocationMessage = function(replyToken, title, address, latitude, longitude) {
    var messageBuilder = new LocationMessage(title, address, latitude, longitude);
    return that.replyMessage(replyToken, messageBuilder);
  }

  this.replyVideoMessage = function(replyToken, originalContentUrl, previewImageUrl) {
    var messageBuilder = new VideoMessage(originalContentUrl, previewImageUrl);
    return that.replyMessage(replyToken, messageBuilder);
  }

  this.replyStickerMessage = function(replyToken, packageId, stickerId) {
    var messageBuilder = new StickerMessage(packageId, stickerId);
    return that.replyMessage(replyToken, messageBuilder);
  }

  this.replyMultiMessage = function(replyToken, messages) {
    if ( messages.length < 1 ) throw new Error('Messages is empty.');
    var messageBuilder = new MultiMessage();
    for ( var i in messages ) {
      messageBuilder.add(messages[i]);
    }
    return that.replyMessage(replyToken, messageBuilder);
  }

  this.pushMessage = function(to, messageBuilder) {
    return client.post(endpointBase + '/' + version + '/bot/message/push', {
      to: to,
      messages: messageBuilder.buildMessage()
    });
  }

  this.pushJsonMessage = function(json) {
    return client.post(endpointBase + '/' + version + '/bot/message/push', json);
  }

  this.pushTextMessage = function(to, text) {
    var extraTexts = Array.prototype.slice.call(arguments, 2);
    var messageBuilder = new TextMessage();
    extraTexts.unshift(text);
    TextMessage.apply(messageBuilder, extraTexts);
    return that.pushMessage(to, messageBuilder);
  }

  this.pushImageMessage = function(to, originalContentUrl, previewImageUrl) {
    var messageBuilder = new ImageMessage(originalContentUrl, previewImageUrl);
    return that.pushMessage(to, messageBuilder);
  }

  this.pushAudioMessage = function(to, originalContentUrl, duration) {
    var messageBuilder = new AudioMessage(originalContentUrl, duration);
    return that.pushMessage(to, messageBuilder);
  }

  this.pushLocationMessage = function(to, title, address, latitude, longitude) {
    var messageBuilder = new LocationMessage(title, address, latitude, longitude);
    return that.pushMessage(to, messageBuilder);
  }

  this.pushVideoMessage = function(to, originalContentUrl, previewImageUrl) {
    var messageBuilder = new VideoMessage(originalContentUrl, previewImageUrl);
    return that.pushMessage(to, messageBuilder);
  }

  this.pushStickerMessage = function(to, packageId, stickerId) {
    var messageBuilder = new StickerMessage(packageId, stickerId);
    return that.pushMessage(to, messageBuilder);
  }

  this.pushMultiMessage = function(to, messages) {
    if ( messages.length < 1 ) throw new Error('Messages is empty.');
    var messageBuilder = new MultiMessage();
    for ( var i in messages ) {
      messageBuilder.add(messages[i]);
    }
    return that.pushMessage(to, messageBuilder);
  }

  this.leaveGroup = function(groupId) {
    return client.post(endpointBase + '/' + version + '/bot/group/' + encodeURIComponent(groupId) + '/leave');
  }

  this.leaveRoom = function(roomId) {
    return client.post(endpointBase + '/' + version + '/bot/room/' + encodeURIComponent(roomId) + '/leave');
  }

  this.handleEventRequest = function(body, signature) {
    try {
      var eventReq = that.parseEventRequest(body, signature);
      for ( var i in eventReq ) {
        var message = eventReq[i];
        that.emit(message.getType(), message.getReplyToken(), message);
      }
    } catch(e) {
      console.error(e);
    }
  }

  this.parseEventRequest = function(body, signature) {
    return Event.parseEventRequest(body, channelSecret, signature);
  }

  this.validateSignature = function(body, signature) {
    return SignatureValidator.validateSignature(body, channelSecret, signature);
  }
}

util.inherits(Bot, EventEmitter);

module.exports = Bot;
