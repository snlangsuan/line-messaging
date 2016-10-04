var MessageEvent = require('../message.event');

AudioMessage.prototype = new MessageEvent();
AudioMessage.prototype.constructor = AudioMessage;

function AudioMessage(event) {
  MessageEvent.apply(this, arguments);
}

module.exports = AudioMessage;
