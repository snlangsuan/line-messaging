var MessageEvent = require('../message.event');

TextMessage.prototype = new MessageEvent();
TextMessage.prototype.constructor = TextMessage;

function TextMessage(event) {
  MessageEvent.apply(this, arguments);

  this.getText = function() {
    return event.message.text;
  }
}

module.exports = TextMessage;
