var Action = require('../action');

TemplateUriAction.prototype = new Action();
TemplateUriAction.prototype.constructor = TemplateUriAction;

function TemplateUriAction(label, uri) {
  var that = this;

  this.buildTemplateAction = function() {
    return {
      type: Action.TYPE.URI,
      label: label,
      uri: uri
    };
  }
}

module.exports = TemplateUriAction;
