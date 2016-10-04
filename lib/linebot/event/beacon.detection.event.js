var BaseEvent = require('./base.event');

BeaconDetectionEvent.prototype = new BaseEvent();
BeaconDetectionEvent.prototype.constructor = BeaconDetectionEvent ;

function BeaconDetectionEvent (event) {
  BaseEvent.apply(this, arguments);

  this.getHwid = function() {
    return event['beacon']['hwid'];
  }
}

module.exports = BeaconDetectionEvent ;
