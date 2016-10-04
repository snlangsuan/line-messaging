var Message = require('./lib/linebot/message');
var BaseEvent = require('./lib/linebot/event/base.event');

module.exports = {
  create: function(options) {
    if ( !options || !options['channelId'] || !options['channelSecret'] || !options['channelToken'] ) throw new Error('Invalid parameter');
    for ( var i in options ) {
      this[i] = options[i];
    }

    var LINEClient = require('./lib/linebot/lineclient');
    var client = new LINEClient(this.channelToken);
    var LINEBot = require('./lib/linebot');
    return new LINEBot(client, this.channelSecret, options);
  },
  createClient: require('./lib/linebot/lineclient'),
  createBot: require('./lib/linebot'),
  // Message builder
  TextMessageBuilder: require('./lib/linebot/message/text.message'),
  ImageMessageBuilder: require('./lib/linebot/message/image.message'),
  AudioMessageBuilder: require('./lib/linebot/message/audio.message'),
  VideoMessageBuilder: require('./lib/linebot/message/video.message'),
  LocationMessageBuilder: require('./lib/linebot/message/location.message'),
  StickerMessageBuilder: require('./lib/linebot/message/sticker.message'),
  MultiMessageBuilder: require('./lib/linebot/message/multi.message'),
  ImagemapMessageBuilder: require('./lib/linebot/message/imagemap.message'),

  // Imagemap utility
  ImagemapBaseSize: require('./lib/linebot/message/imagemap/base.size'),
  ImagemapArea: require('./lib/linebot/action/imagemap.area'),

  // Imagemap action
  ImagemapMessageAction: require('./lib/linebot/action/imagemap.message.action'),
  ImagemapUriAction: require('./lib/linebot/action/imagemap.uri.action'),
  TemplateMessageBuilder: require('./lib/linebot/message/template.message'),

  // Template types
  ButtonTemplateBuilder: require('./lib/linebot/message/template/button.template'),
  ConfirmTemplateBuilder: require('./lib/linebot/message/template/confirm.template'),
  CarouselColumnTemplateBuilder: require('./lib/linebot/message/template/carousel.column.template'),
  CarouselTemplateBuilder: require('./lib/linebot/message/template/carousel.template'),

  // Template action
  MessageTemplateAction: require('./lib/linebot/action/template.message.action'),
  PostbackTemplateAction: require('./lib/linebot/action/template.postback.action'),
  UriTemplateAction: require('./lib/linebot/action/template.uri.action'),
  MessageType: Message.TYPE,
  EventType: BaseEvent.TYPE,
  EventSourceType: BaseEvent.SOURCE_TYPE
};
