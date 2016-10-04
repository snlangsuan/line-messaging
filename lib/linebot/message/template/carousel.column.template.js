var Template = require('../template');

CarouselColumnTemplate.prototype = new Template();
CarouselColumnTemplate.prototype.constructor = CarouselColumnTemplate;

function CarouselColumnTemplate(title, text, thumbnailImageUrl, actionsBuilders) {
  var that = this;
  var template = [];

  this.buildTemplate = function() {
    if ( template.length ) return template;

    var actions = [];
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
