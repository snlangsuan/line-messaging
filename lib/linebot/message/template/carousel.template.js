var Template = require('../template');

CarouselTemplate.prototype = new Template();
CarouselTemplate.prototype.constructor = CarouselTemplate;

function CarouselTemplate(columnTemplate) {
  var that = this;
  var template = [];
  var columns = [];

  this.buildTemplate = function() {
    if ( template.length ) return template;

    for ( var i in columnTemplate ) {
      columns.push(columnTemplate[i].buildTemplate());
    }

    template = {
      type: Template.TYPE.CAROUSEL,
      columns: columns
    };

    return template;
  }
}

module.exports = CarouselTemplate;
