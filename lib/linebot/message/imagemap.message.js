var Message = require('../message');

ImagemapMessage.prototype = new Message();
ImagemapMessage.prototype.constructor = ImagemapMessage;

function ImagemapMessage(baseUrl, altText, baseSize, imagemapActions) {
  var that = this;
  var message = [];

  this.buildMessage = function() {
    if ( message.length ) return message;

    actions = [];
    for ( var i in imagemapActions ) {
      var builder = imagemapActions[i];
      actions.push(builder.buildImagemapAction());
    }

    message.push({
      type: Message.TYPE.IMAGEMAP,
      baseUrl: baseUrl,
      altText: altText,
      baseSize: baseSize.build(),
      actions: actions
    });

    return message;
  }
}

module.exports = ImagemapMessage;
