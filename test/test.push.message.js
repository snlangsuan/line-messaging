'use strict';
var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var nock = require('nock');

// chai.use(chaiAsPromised);

var LINEBot = require('../');

var TextMessageBuilder = LINEBot.TextMessageBuilder;
var ImageMessageBuilder = LINEBot.ImageMessageBuilder;

// Imagemap
var ImagemapMessageBuilder = LINEBot.ImagemapMessageBuilder;
var ImagemapBaseSize = LINEBot.ImagemapBaseSize;
var ImagemapArea = LINEBot.ImagemapArea;
var ImagemapMessageAction = LINEBot.ImagemapMessageAction;
var ImagemapUriAction = LINEBot.ImagemapUriAction;

// Template
var TemplateMessageBuilder = LINEBot.TemplateMessageBuilder;
var ButtonTemplateBuilder = LINEBot.ButtonTemplateBuilder;
var ConfirmTemplateBuilder = LINEBot.ConfirmTemplateBuilder;
var CarouselColumnTemplateBuilder = LINEBot.CarouselColumnTemplateBuilder;
var CarouselTemplateBuilder = LINEBot.CarouselTemplateBuilder;
var MessageTemplateAction = LINEBot.MessageTemplateAction;
var PostbackTemplateAction = LINEBot.PostbackTemplateAction;
var UriTemplateAction = LINEBot.UriTemplateAction;

var MultiMessageBuilder = LINEBot.MultiMessageBuilder;

function mockApi() {
  nock('https://api.line.me')
    .post('/v2/bot/message/push')
    .reply(200, {});
}

describe('LINEBot#PushMessage', function() {
  var options = {
    channelID: '1482333960',
    channelSecret: 'testsecret',
    channelAccessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9/eyJzdWIiOiIyMDAiLCJpc3MiOiJodHRwOlwvXC9lZGNtcy5tb25vaW5mb3N5c3RlbXMuY29tXC9hcGlcL3YxXC9hdXRoXC9sb2dpbiIsImlhdCI6MTQ3NTAzMDc5MiwiZXhwIjoxNDc1MDM0MzkyLCJuYmYiOjE0NzUwMzA3OTIsImp0aSI6IjNkMTlkZjRhOTQ4YzgxNjU2ZTUzMzZlZjVmY2E2YWIwIn0/Fdmehk8h50Aeg5k8yHG9vsNJXvVQGQI5rdpz0rndge8'
  };

  var bot = LINEBot.Client(options);

  beforeEach(function() {
    mockApi();
  });

  it('should be able to push text message', function(done) {
    bot.pushTextMessage('DUMMY_MID', 'hello!').then(function() {
      done();
    });
  });

  it('should be able to push image message', function(done) {
    bot.pushImageMessage('DUMMY_MID', 'https://example.com/original.jpg', 'https://example.com/preview.jpg').then(function() {
      done();
    });
  });

  it('should be able to push video message', function(done) {
    bot.pushVideoMessage('DUMMY_MID', 'https://example.com/original.mp4', 'https://example.com/preview.jpg').then(function() {
      done();
    });
  });

  it('should be able to push audio message', function(done) {
    bot.pushAudioMessage('DUMMY_MID', 'https://example.com/original.m4a', '240000').then(function() {
      done();
    });
  });

  it('should be able to push location message', function(done) {
    bot.pushLocationMessage('DUMMY_MID', 'my location', '〒150-0002 東京都渋谷区渋谷２丁目２１−１', 35.65910807942215, 139.70372892916203).then(function() {
      done();
    });
  });

  it('should be able to push sticker message', function(done) {
    bot.pushLocationMessage('DUMMY_MID', 1, 1).then(function() {
      done();
    });
  });

  it('should be able to push multi message', function(done) {
    var messages = [
      new TextMessageBuilder('Hello'),
      new ImageMessageBuilder('https://example.com/original.jpg', 'https://example.com/preview.jpg')
    ];
    bot.pushMultiMessage('DUMMY_MID', messages).then(function() {
      done();
    });
  });

  it('should be able to push imagemap message', function(done) {
    var actions = [
      new ImagemapUriAction('https://notify.enjoy108.com', new ImagemapArea(0, 100, 1040, 30)),
      new ImagemapMessageAction('hello', new ImagemapArea(0, 130, 1040, 30))
    ];
    var messageBuilder = new ImagemapMessageBuilder('https://example.com/bot/images/rm001', 'this is an imagemap', new ImagemapBaseSize(1040, 1040), actions);
    bot.pushMessage('DUMMY_MID', messageBuilder).then(function() {
      done();
    });
  });

  it('should be able to push button template message', function(done) {
    var actions = [
      new PostbackTemplateAction('Buy', 'actions=buy&itemid=123'),
      new PostbackTemplateAction('Add to cart', 'action=add&itemid=123'),
      new UriTemplateAction('view detail', 'http://example.com/page/123')
    ];
    var buttonTemplate = new ButtonTemplateBuilder('Menu', 'Please select', 'https://notify.enjoy108.com/bots/line/images/marukuma', actions);
    var messageBuilder = new TemplateMessageBuilder('this is a buttons template', buttonTemplate);
    bot.pushMessage('DUMMY_MID', messageBuilder).then(function() {
      done();
    });
  });

  it('should be able to push confirm template message', function(done) {
    var actions = [
      new MessageTemplateAction('Yes', 'yes'),
      new MessageTemplateAction('No', 'no')
    ];
    var confirmTemplate = new ConfirmTemplateBuilder('Are you sure', actions);
    var messageBuilder = new TemplateMessageBuilder('this is a confirm template', confirmTemplate);
    bot.pushMessage('DUMMY_MID', messageBuilder).then(function() {
      done();
    });
  });

  it('should be able to push carousel template message', function(done) {
    var columns = [
      new CarouselColumnTemplateBuilder('this is menu', 'description', 'https://example.com/bot/images/item1.jpg', [
        new PostbackTemplateAction('Buy', 'actions=buy&itemid=111'),
        new PostbackTemplateAction('Add to cart', 'action=add&itemid=111'),
        new UriTemplateAction('view detail', 'http://example.com/page/111')
      ]),
      new CarouselColumnTemplateBuilder('this is menu', 'description', 'https://example.com/bot/images/item2.jpg', [
        new PostbackTemplateAction('Buy', 'actions=buy&itemid=222'),
        new PostbackTemplateAction('Add to cart', 'action=add&itemid=222'),
        new UriTemplateAction('view detail', 'http://example.com/page/222')
      ]),
      new CarouselColumnTemplateBuilder('this is menu', 'description', 'https://example.com/bot/images/item3.jpg', [
        new PostbackTemplateAction('Buy', 'actions=buy&itemid=333'),
        new PostbackTemplateAction('Add to cart', 'action=add&itemid=333'),
        new UriTemplateAction('view detail', 'http://example.com/page/333')
      ]),
    ];
    var carouselTemplate = new CarouselTemplateBuilder(columns);
    var messageBuilder = new TemplateMessageBuilder('this is a carousel template', carouselTemplate);
    bot.pushMessage('DUMMY_MID', messageBuilder).then(function() {
      done();
    });
  });
});
