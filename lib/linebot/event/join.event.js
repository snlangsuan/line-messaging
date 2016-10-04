var BaseEvent = require('./base.event');

JoinEvent.prototype = new BaseEvent();
JoinEvent.prototype.constructor = JoinEvent;

function JoinEvent(event) {
  BaseEvent.apply(this, arguments);
}

module.exports = JoinEvent;
