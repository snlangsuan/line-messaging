var Message = require('../message');

StickerMessage.prototype = new Message();
StickerMessage.prototype.constructor = StickerMessage;

function StickerMessage(packageId, stickerId) {
  var that = this;

  this.buildMessage = function() {
    return [{
      type: Message.TYPE.STICKER,
      packageId: packageId,
      stickerId: stickerId
    }];
  }
}

module.exports = StickerMessage;
