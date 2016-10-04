var BaseEvent = require('./base.event');

UnfollowEvent.prototype = new BaseEvent();
UnfollowEvent.prototype.constructor = UnfollowEvent;

function UnfollowEvent(event) {
  BaseEvent.apply(this, arguments);
}

module.exports = UnfollowEvent;
