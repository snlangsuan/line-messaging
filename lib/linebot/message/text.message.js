var Message = require('../message');

TextMessage.prototype = new Message();
TextMessage.prototype.constructor = TextMessage;

function TextMessage() {
  var that = this;
  var texts = arguments;
  var message = [];

  this.buildMessage = function() {
    if ( message.length ) return message;

    for ( var i in texts )
      message.push({
        type: Message.TYPE.TEXT,
        text: texts[i]
      });

    return message;
  }
}

module.exports = TextMessage;
