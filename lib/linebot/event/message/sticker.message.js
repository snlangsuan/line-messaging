var MessageEvent = require('../message.event');

StickerMessage.prototype = new MessageEvent();
StickerMessage.prototype.constructor = StickerMessage;

function StickerMessage(event) {
  MessageEvent.apply(this, arguments);

  this.getPackageId = function() {
    return event.message.packageId;
  }

  this.getStickerId = function() {
    return event.message.stickerId;
  }
}

module.exports = StickerMessage;
