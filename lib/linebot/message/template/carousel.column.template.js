var Template = require('../template');

CarouselColumnTemplate.prototype = new Template();
CarouselColumnTemplate.prototype.constructor = CarouselColumnTemplate;

function CarouselColumnTemplate(title, text, thumbnailImageUrl, actionsBuilders) {
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
      thumbnailImageUrl: thumbnailImageUrl,
      title: title,
      text: text,
      actions: actions
    };

    return template;
  }
}

module.exports = CarouselColumnTemplate;
