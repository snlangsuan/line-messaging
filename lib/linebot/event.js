var SignatureValidator = require('./signature.validator');

Event.prototype.eventTypeClass = {
  message: require('./event/message.event'),
  follow: require('./event/follow.event'),
  unfollow: require('./event/unfollow.event'),
  join: require('./event/join.event'),
  leave: require('./event/leave.event'),
  postback: require('./event/post.back.event'),
  beacon: require('./event/beacon.detection.event')
};

Event.prototype.messageTypeClass = {
  text: require('./event/message/text.message'),
  image: require('./event/message/image.message'),
  video: require('./event/message/video.message'),
  audio: require('./event/message/audio.message'),
  location: require('./event/message/location.message'),
  sticker: require('./event/message/sticker.message')
};

function Event() {}

Event.prototype.parseEventRequest = function(body, channelSecret, signature) {
  if ( !signature ) throw new Error('Request does not contain signature');
  if ( typeof body === 'string' ) throw new Error('Request body must not be String');

  var rawBody = ( body instanceof Buffer )? body: body = new Buffer(JSON.stringify(body));
  if ( !SignatureValidator.validateSignature(rawBody, channelSecret, signature) ) throw new Error('Invalid signature has given');
  body = JSON.parse(body.toString());

  var events = [];

  if ( !body['events'] ) throw new Error('Invalid event request');

  for ( var i in body.events ) {
    var eventData = body.events[i];
    var eventType = eventData.type;
    var eventClass = this.eventTypeClass[eventType];

    if ( !eventClass ) throw new Error('Unknown event type has come: ' + eventType);

    if ( eventType === 'message' ) {
      events.push(this.parseMessageEvent(eventData));
      continue;
    }

    events.push(new eventClass(eventData));
  }

  return events;
}

Event.prototype.parseMessageEvent = function(eventData) {
  messageType = eventData.message.type;
  messageClass = this.messageTypeClass[messageType];
  if ( !messageClass ) throw new Error('Unknown message type has come: ' + messageType);

  return new messageClass(eventData);
}

module.exports = new Event();
