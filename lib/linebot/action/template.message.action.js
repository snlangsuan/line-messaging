var Action = require('../action');

TemplateMessageAction.prototype = new Action();
TemplateMessageAction.prototype.constructor = TemplateMessageAction;

function TemplateMessageAction(label, text) {
  var that = this;

  this.buildTemplateAction = function() {
    return {
      type: Action.TYPE.MESSAGE,
      label: label,
      text: text
    };
  }
}

module.exports = TemplateMessageAction;
