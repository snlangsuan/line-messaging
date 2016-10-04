var MessageEvent = require('../message.event');

ImageMessage.prototype = new MessageEvent();
ImageMessage.prototype.constructor = ImageMessage;

function ImageMessage(event) {
  MessageEvent.apply(this, arguments);
}

module.exports = ImageMessage;
