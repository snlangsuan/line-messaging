var Action = require('../action');

ImagemapUriAction.prototype = new Action();
ImagemapUriAction.prototype.constructor = ImagemapUriAction;

function ImagemapUriAction(linkUri, area) {
  var that = this;

  this.buildImagemapAction = function() {
    return {
      type: Action.TYPE.URI,
      linkUri: linkUri,
      area: area.build()
    };
  }
}

module.exports = ImagemapUriAction;
