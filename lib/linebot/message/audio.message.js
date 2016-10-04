var Message = require('../message');

AudioMessage.prototype = new Message();
AudioMessage.prototype.constructor = AudioMessage;

function AudioMessage(originalContentUrl, duration) {
  var that = this;

  this.buildMessage = function() {
    return [{
      type: Message.TYPE.AUDIO,
      originalContentUrl: originalContentUrl,
      duration: duration
    }];
  }
}

module.exports = AudioMessage;
