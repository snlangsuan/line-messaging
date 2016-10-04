var Message = require('../message');

TemplateMessage.prototype = new Message();
TemplateMessage.prototype.constructor = TemplateMessage;

function TemplateMessage(altText, template) {
  var that = this;

  this.buildMessage = function() {
    return [{
      type: Message.TYPE.TEMPLATE,
      altText: altText,
      template: template.buildTemplate()
    }];
  }
}

module.exports = TemplateMessage;
