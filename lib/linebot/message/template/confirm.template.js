var Template = require('../template');

ConfirmTemplate.prototype = new Template();
ConfirmTemplate.prototype.constructor = ConfirmTemplate;

function ConfirmTemplate(text, actionsBuilders) {
  var that = this;
  var template = [];

  this.buildTemplate = function() {
    if ( template.length ) return template;

    var actions = [];
    for ( var i in actionsBuilders ) {
      actions.push(actionsBuilders[i].buildTemplateAction());
    }

    template = {
      type: Template.TYPE.CONFIRM,
      text: text,
      actions: actions
    };

    return template;
  }
}

module.exports = ConfirmTemplate;
