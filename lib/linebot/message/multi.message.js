var Message = require('../message');

MultiMessage.prototype = new Message();
MultiMessage.prototype.constructor = MultiMessage;

function MultiMessage() {
  var that = this;
  var messageBuilders = [];
  this.add = function(messageBuilder) {
    messageBuilders.push(messageBuilder);

    return that;
  }

  this.buildMessage = function() {
    var messages = [];

    for ( var i in messageBuilders ) {
      var messageBuilder = messageBuilders[i].buildMessage();
      for ( var j in messageBuilder ) {
        messages.push(messageBuilder[j]);
      }
    }
    
    return messages;
  }
}

module.exports = MultiMessage;
