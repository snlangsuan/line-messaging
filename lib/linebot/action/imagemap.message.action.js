var Action = require('../action');

ImagemapMessageAction.prototype = new Action();
ImagemapMessageAction.prototype.constructor = ImagemapMessageAction;

function ImagemapMessageAction(text, area) {
  var that = this;

  this.buildImagemapAction = function() {
    return {
      type: Action.TYPE.MESSAGE,
      text: text,
      area: area.build()
    };
  }
}

module.exports = ImagemapMessageAction;
