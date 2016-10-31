var Http = require('http');
var LINEClient = require('./linebot/lineclient');
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

// LINEBot.MessageType = Message.TYPE;
// LINEBot.EventType = BaseEvent.TYPE;
// LINEBot.EventSourceType = BaseEvent.SOURCE_TYPE;

function LINEBot(client, channelSecret, options) {
  if ( ! client instanceof LINEClient ) throw new Error('LINEClient is not defined');
  if ( !channelSecret ) throw new Error('channel secret is not defined');

  var that = this;
  const DEFAULT_ENDPOINT_BASE = 'https://api.line.me';
  if ( !options ) options = {};
  var endpointBase = ( !options['endpointBase'] )? DEFAULT_ENDPOINT_BASE: options['endpointBase'];

  for ( var i in options ) {
    this[i] = options[i];
  }

  this.set = function(key, value) {
    this[key] = value;
  }

  this.get = function(key) {
    return this[key];
  }

  var httpRequest = function(req, res) {
    if ( req.method == 'POST' && req.url == that.route ) {
      var body = [];
      req.on('data', function(chunk) {
        body.push(chunk);
      }).on('end', function() {
        body = Buffer.concat(body).toString();
        if ( !body ) return;
        var json = JSON.parse(body);

        var headers = req.headers;
        var signature = headers['x-line-signature'];

        that.handleEventRequest(json, signature);
      });

      res.end();
    }
  }

  this.attach = function(http) {
    this.httpServer = http;
    this.httpServer.on('request', httpRequest);
    return this;
  }

  this.webhook = function(route) {
    this.route = route;

    return this;
  }

  this.listen = function(port, callback) {
    if ( ! this.route ) this.route = '/';
    var params = arguments;
    var callback = (typeof params[params.length-1] === 'function' )? params[params.length-1]: null;
    if ( params[0] < 1 ) throw new Error('Port number is not defined');
    var port = parseInt(params[0]);
    var hostname = (typeof params[2] === 'string')? params[2]: null;
    this.httpServer = Http.createServer(httpRequest).listen(port, hostname, callback);
  }

  this.close = function(callback) {
    this.httpServer.close(callback);
  }

  this.getHeaderSignature = function(req) {
    return req.get('X-Line-Signature');
  }

  this.getProfile = function(userId) {
    return client.get(endpointBase + '/v2/bot/profile/' + encodeURIComponent(userId));
  }

  this.getMessageContent = function(messageId) {
    return client.get(endpointBase + '/v2/bot/message/' + encodeURIComponent(messageId) + '/content');
  }

  this.replyMessage = function(replyToken, messageBuilder) {
    return client.post(endpointBase + '/v2/bot/message/reply', {
      replyToken: replyToken,
      messages: messageBuilder.buildMessage()
    });
  }

  this.replyText = function(replyToken, text) {
    var extraTexts = Array.prototype.slice.call(arguments, 2);
    var messageBuilder = new TextMessage();
    extraTexts.unshift(text);
    TextMessage.apply(messageBuilder, extraTexts);
    return that.replyMessage(replyToken, messageBuilder);
  }

  this.pushMessage = function(to, messageBuilder) {
    return client.post(endpointBase + '/v2/bot/message/push', {
      to: to,
      messages: messageBuilder.buildMessage()
    });
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
    return client.post(endpointBase + '/v2/bot/group/' + encodeURIComponent(groupId) + '/leave');
  }

  this.leaveRoom = function(roomId) {
    return client.post(endpointBase + '/v2/bot/room/' + encodeURIComponent(roomId) + '/leave');
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

util.inherits(LINEBot, EventEmitter);

module.exports = LINEBot;
