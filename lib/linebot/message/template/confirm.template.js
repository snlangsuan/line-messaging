var Template = require('../template');

ConfirmTemplate.prototype = new Template();
ConfirmTemplate.prototype.constructor = ConfirmTemplate;

function ConfirmTemplate(text, actionsBuilders) {
  var that = this;
  // var strText = text;
  var template = [];
  var actions = [];

  this.setMessage = function(message) {
    text = message;

    return this;
  }

  this.setPositiveAction = function(label, data, type) {
    actions.push(that.createAction(label, data, type));
    return that;
  }

  this.setNegativeAction = function(label, data, type) {
    actions.push(that.createAction(label, data, type));
    return that;
  }

  this.buildTemplate = function() {
    if ( template.length ) return template;

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
