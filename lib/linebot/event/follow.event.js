var BaseEvent = require('./base.event');

FollowEvent.prototype = new BaseEvent();
FollowEvent.prototype.constructor = FollowEvent;

function FollowEvent(event) {
  BaseEvent.apply(this, arguments);
}

module.exports = FollowEvent;
