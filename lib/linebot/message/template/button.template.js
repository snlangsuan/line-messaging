var Template = require('../template');

ButtonTemplate.prototype = new Template();
ButtonTemplate.prototype.constructor = ButtonTemplate;

function ButtonTemplate(title, text, thumbnailImageUrl, actionsBuilders) {
  var that = this;
  var template = [];
  var actions = [];

  this.setTitle = function(str) {
    title = str;
    return that;
  }

  this.setMessage = function(message) {
    text = message;
    return that;
  }

  this.setThumbnail = function(url) {
    thumbnailImageUrl = url;
    return that;
  }

  this.addAction = function(label, data, type) {
    actions.push(that.createAction(label, data, type));
    return that;
  }

  this.buildTemplate = function() {
    if ( template.length ) return template;

    for ( var i in actionsBuilders ) {
      actions.push(actionsBuilders[i].buildTemplateAction());
    }

    template = {
      type: Template.TYPE.BUTTONS,
      thumbnailImageUrl: thumbnailImageUrl,
      title: title,
      text: text,
      actions: actions
    };

    return template;
  }
}

module.exports = ButtonTemplate;
