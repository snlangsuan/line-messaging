var MessageEvent = require('../message.event');

LocationMessage.prototype = new MessageEvent();
LocationMessage.prototype.constructor = LocationMessage;

function LocationMessage(event) {
  MessageEvent.apply(this, arguments);

  this.getTitle = function() {
    return event.message.title;
  }

  this.getAddress = function() {
    return event.message.address;
  }

  this.getLatitude = function() {
    return event.message.latitude;
  }

  this.getLongitude = function() {
    return event.message.longitude;
  }
}

module.exports = LocationMessage;
