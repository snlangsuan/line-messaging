var Message = require('../message');

ImageMessage.prototype = new Message();
ImageMessage.prototype.constructor = ImageMessage;

function ImageMessage(originalContentUrl, previewImageUrl) {
  var that = this;

  this.buildMessage = function() {
    return [{
      type: Message.TYPE.IMAGE,
      originalContentUrl: originalContentUrl,
      previewImageUrl: previewImageUrl
    }];
  }
}

module.exports = ImageMessage;
