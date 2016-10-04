var BaseEvent = require('./base.event');

LeaveEvent.prototype = new BaseEvent();
LeaveEvent.prototype.constructor = LeaveEvent;

function LeaveEvent(event) {
  BaseEvent.apply(this, arguments);
}

module.exports = LeaveEvent;
