var Message = require('../message');

LocationMessage.prototype = new Message();
LocationMessage.prototype.constructor = LocationMessage;

function LocationMessage(title, address, latitude, longitude) {
  var that = this;

  this.buildMessage = function() {
    return [{
      type: Message.TYPE.LOCATION,
      title: title,
      address: address,
      latitude: latitude,
      longitude: longitude
    }];
  }
}

module.exports = LocationMessage;
