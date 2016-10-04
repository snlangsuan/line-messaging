var Action = require('../action');

TemplatePostbackAction.prototype = new Action();
TemplatePostbackAction.prototype.constructor = TemplatePostbackAction;

function TemplatePostbackAction(label, data) {
  var that = this;

  this.buildTemplateAction = function() {
    return {
      type: Action.TYPE.POSTBACK,
      label: label,
      data: data
    };
  }
}

module.exports = TemplatePostbackAction;
