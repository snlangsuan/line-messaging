var Action = require('../action');
var MessageTemplateAction = require('../action/template.message.action');
var PostbackTemplateAction = require('../action/template.postback.action');
var UriTemplateAction = require('../action/template.uri.action');

Template.TYPE = {
  CONFIRM: 'confirm',
  BUTTONS: 'buttons',
  CAROUSEL: 'carousel'
};

function Template() {}

Template.prototype.buildTemplate = function() {}

Template.prototype.createAction = function(label, data, type) {
  switch (type) {
    case Action.TYPE.POSTBACK:
      return new PostbackTemplateAction(label, data).buildTemplateAction();
    case Action.TYPE.URI:
      return new UriTemplateAction(label, data).buildTemplateAction();
    default:
      return new MessageTemplateAction(label, data).buildTemplateAction();
  }
}

module.exports = Template;
