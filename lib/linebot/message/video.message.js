var Message = require('../message');

VideoMessage.prototype = new Message();
VideoMessage.prototype.constructor = VideoMessage;

function VideoMessage(originalContentUrl, previewImageUrl) {
  var that = this;

  this.buildMessage = function() {
    return [{
      type: Message.TYPE.VIDEO,
      originalContentUrl: originalContentUrl,
      previewImageUrl: previewImageUrl
    }];
  }
}

module.exports = VideoMessage;
