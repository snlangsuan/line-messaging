var BaseEvent = require('./base.event');

PostbackEvent.prototype = new BaseEvent();
PostbackEvent.prototype.constructor = PostbackEvent;

function PostbackEvent(event) {
  BaseEvent.apply(this, arguments);

  this.getPostbackData = function() {
    return event['postback']['data'];
  }
}

module.exports = PostbackEvent;
