var Template = require('../template');

ButtonTemplate.prototype = new Template();
ButtonTemplate.prototype.constructor = ButtonTemplate;

function ButtonTemplate(title, text, thumbnailImageUrl, actionsBuilders) {
  var that = this;
  var template = [];

  this.buildTemplate = function() {
    if ( template.length ) return template;

    var actions = [];
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
