var MessageEvent = require('../message.event');

VideoMessage.prototype = new MessageEvent();
VideoMessage.prototype.constructor = VideoMessage;

function VideoMessage(event) {
  MessageEvent.apply(this, arguments);
}

module.exports = VideoMessage;
