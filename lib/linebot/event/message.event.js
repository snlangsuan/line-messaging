var BaseEvent = require('./base.event');

MessageEvent.prototype = new BaseEvent();
MessageEvent.prototype.constructor = MessageEvent;

function MessageEvent(event) {
  BaseEvent.apply(this, arguments);

  this.getMessageType = function() {
    return event.message.type;
  }

  this.isMessageType = function(type) {
    return (event.message.type == type);
  }

  this.getMessageId = function() {
    return event.message.id;
  }
}

module.exports = MessageEvent;
