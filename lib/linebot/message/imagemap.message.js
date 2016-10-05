var Message = require('../message');
var Action = require('../action');
var BaseSize = require('./imagemap/base.size');
var ActionArea = require('../action/imagemap.area');
var MessageAction = require('../action/imagemap.message.action');
var UriAction = require('../action/imagemap.uri.action');

ImagemapMessage.prototype = new Message();
ImagemapMessage.prototype.constructor = ImagemapMessage;

function ImagemapMessage(baseUrl, altText, baseSize, imagemapActions) {
  var that = this;
  var message = [];
  var actions = [];

  this.setImageBase = function(url) {
    baseUrl = url;
    return that;
  }

  this.setAlternate = function(text) {
    altText = text;
    return that;
  }

  this.setBaseSize = function(width, height) {
    baseSize = new BaseSize(width, height);
    return that;
  }

  this.addAction = function(data, x, y, width, height, type) {
    var area = new ActionArea(x, y, width, height);
    if ( type == Action.TYPE.URI ) {
      var action = new UriAction(data, area)
      actions.push(action.buildImagemapAction());
    } else {
      var action = new MessageAction(data, area);
      actions.push(action.buildImagemapAction());
    }
    return that;
  }

  this.buildMessage = function() {
    if ( message.length ) return message;

    for ( var i in imagemapActions ) {
      var builder = imagemapActions[i];
      actions.push(builder.buildImagemapAction());
    }

    message.push({
      type: Message.TYPE.IMAGEMAP,
      baseUrl: baseUrl,
      altText: altText,
      baseSize: baseSize.build(),
      actions: actions
    });

    return message;
  }
}

module.exports = ImagemapMessage;
