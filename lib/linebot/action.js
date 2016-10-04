Action.TYPE = {
  MESSAGE: 'message',
  POSTBACK: 'postback',
  URI: 'uri'
};

function Action() {}

Action.prototype.buildImagemapAction = function() {}
Action.prototype.buildTemplateAction = function() {}

module.exports = Action;
