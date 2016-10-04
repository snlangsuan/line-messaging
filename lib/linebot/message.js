Message.TYPE = {
  TEXT: 'text',
  TEMPLATE: 'template',
  IMAGEMAP: 'imagemap',
  STICKER: 'sticker',
  LOCATION: 'location',
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video'
};

function Message() {}

Message.prototype.buildMessage = function() {}

module.exports = Message;
