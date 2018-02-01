# line-messaging

==

[![npm version](https://badge.fury.io/js/line-messaging.svg)](https://badge.fury.io/js/line-messaging)
[![Build Status](https://travis-ci.org/snlangsuan/line-messaging.svg?branch=master)](https://travis-ci.org/snlangsuan/line-messaging)

SDK of the LINE Messaging API for Node.js

Installation
--

The LINE BOT API SDK can be installed with [NPM](https://www.npmjs.com).

```
$ npm install line-messaging
```

Getting started
--

### Require the SDK
```js
var LINEBot = require('line-messaging');
```

#### Using with Express 3/4
```js
var app = require('express')();
var bot = LINEBot.Client({
  channelID: '<your channel ID>',
  channelSecret: '<your channel secret>',
  channelAccessToken: '<your channel token>'
}, server);
app.use(bot.webhook('/webhook'));
bot.on(LINEBot.Events.MESSAGE, function(replyToken, message) {
  // add code below.
});
bot.listen(8080);
```

### Create the bot client instance
Instance of bot client is a handler of the Messaging API.

```js
var bot = LINEBot.Client({
  channelID: '<your channel ID>',
  channelSecret: '<your channel secret>',
  channelAccessToken: '<your channel token>'
})
```

### Call API

You can call API through the bot client instance.

#### Reply message
sample is following;

```js
bot.replyTextMessage('<reply token>', 'hello!').then(function(data) {
  // add your code when success.
}).catch(function(error) {
  // add your code when error.
});
```
This procedure sends a message to the destination that is associated with <reply token>.

More advanced sample is below;

```js
var textMessageBuilder = new LINEBot.TextMessageBuilder('hello');
bot.replyMessage('<reply token>', textMessageBuilder);
```

LINEBot#replyMessage() takes reply token and MessageBuilder. This method sends message that is built by MessageBuilder to the destination.

#### Get profile
Get detail information of user.

```js
bot.getProfile('<user id>').then(function(data) {
  // add your code when success.
}).catch(function(error) {
  // add your code when error.
});
```

When LINEBot#getProfile() success return JSON object.

Response body example
```js
{
    "displayName":"LINE taro",
    "userId":"Uxxxxxxxxxxxxxx...",
    "pictureUrl":"http://obs.line-apps.com/...",
    "statusMessage":"Hello, LINE!"
}
```

#### Get message content
Get detail information of message content.

```js
bot.getMessageContent('<message id>').then(function(data) {
  // add your code when success.
}).catch(function(error) {
// add your code when error.
});
```

When LINEBot#getMessageContent() success return the content in binary.

#### Push message
sample is following;

```js
bot.pushTextMessage('<user id>', 'hello!');
```
This procedure sends a message to the destination that is associated with <user id>.

More advanced sample is below;

```js
var textMessageBuilder = new LINEBot.TextMessageBuilder('hello');
bot.pushMessage('<user id>', textMessageBuilder);
```

Other method;

Send image message
```js
bot.pushImageMessage('<user id>', 'https://example.com/original.jpg', 'https://example.com/preview.jpg');
```

Send audio message
```js
bot.pushAudioMessage('<user id>', 'https://example.com/original.m4a', 240000);
```

Send video message
```js
bot.pushVideoMessage('<user id>', 'https://example.com/original.mp4', 'https://example.com/preview.jpg');
```

Send location message
```js
bot.pushLocationMessage('<user id>', 'my location', '〒150-0002 東京都渋谷区渋谷２丁目２１−１', 35.65910807942215, 139.70372892916203);
```

Send sticker message
```js
bot.pushStickerMessage('<user id>', 1, 1);
```
If you want detail information of sticker, please refer [Sticker](https://devdocs.line.me/files/sticker_list.pdf)

Send multi message
```js
bot.pushMultiMessage('<user id>', '<array of message builder>');
```

#### Message builder
Type of message depends on the type of instance of MessageBuilder. That means this method sends text message if you pass TextMessageBuilder, on the other hand it sends image message if you pass ImageMessageBuilder.

The type of instance of MessageBuilder

TextMessageBuilder
```js
var text = new LINEBot.TextMessageBuilder('Hello', 'World!', ...);
```

ImageMessageBuilder
```js
var image = new LINEBot.ImageMessageBuilder('https://example.com/original.jpg', 'https://example.com/preview.jpg');
```

AudioMessageBuilder
```js
var audio = new LINEBot.AudioMessageBuilder('https://example.com/original.m4a', 240000);
```

VideoMessageBuilder
```js
var video = new LINEBot.VideoMessageBuilder('https://example.com/original.mp4', 'https://example.com/preview.jpg');
```

LocationMessageBuilder
```js
var location = new LINEBot.LocationMessageBuilder('my location', '〒150-0002 東京都渋谷区渋谷２丁目２１−１', 35.65910807942215, 139.70372892916203);
```

StickerMessageBuilder
```js
var sticker = new LINEBot.StickerMessageBuilder(1, 1);
```

MultiMessageBuilder
```js
var multiMessageBuilder = new LINEBot.MultiMessageBuilder([
  text,
  image,
  audio,
  video
]);
```

ImagemapMessageBuilder
```js
var imagemap = new LINEBot.ImagemapMessageBuilder();
imagemap.setImageBase('https://example.com/bot/images/rm001');
imagemap.setAlternate('this is an imagemap');
imagemap.setBaseSize(1040, 1040);

// message/url, x, y, with, height, type
imagemap.addAction('https://example.com/', 0, 100, 1040, 100, LINEBot.Action.URI);
imagemap.addAction('hello', 0, 200, 1040, 100, LINEBot.Action.MESSAGE);
```

TemplateMessageBuilder

- Buttons

```js
var buttons = new LINEBot.ButtonTemplateBuilder();
buttons.setTitle('Menu');
buttons.setMessage('Please select');
buttons.setThumbnail('https://example.com/bot/images/image.jpg');

// label, data/url, type
buttons.addAction('Buy', 'action=buy&itemid=123', LINEBot.Action.POSTBACK);
buttons.addAction('Add to cart', 'action=buy&itemid=123', LINEBot.Action.POSTBACK);
buttons.addAction('View detail', 'http://example.com/page/123', LINEBot.Action.URI);
```

- Confirm

```js
// create confirm template
var confirm = new LINEBot.ConfirmTemplateBuilder();
confirm.setMessage('Are you sure?');
confirm.setPositiveAction('OK', 'ok');
confirm.setNegativeAction('Cancel', 'cannel');
```

- Carousel

```js
var column1 = new LINEBot.CarouselColumnTemplateBuilder();
column1.setTitle('this is item 1')
       .setMessage('description')
       .setThumbnail('https://example.com/bot/images/item1.jpg')
       .addAction('Buy', 'action=buy&itemid=111', LINEBot.Action.POSTBACK)
       .addAction('Add to cart', 'action=buy&itemid=111', LINEBot.Action.POSTBACK)
       .addAction('View detail', 'http://example.com/page/111', LINEBot.Action.URI);

var column2 = new LINEBot.CarouselColumnTemplateBuilder();
column2.setTitle('this is item 2')
       .setMessage('description')
       .setThumbnail('https://example.com/bot/images/item2.jpg')
       .addAction('Buy', 'action=buy&itemid=222', LINEBot.Action.POSTBACK)
       .addAction('Add to cart', 'action=buy&itemid=222', LINEBot.Action.POSTBACK)
       .addAction('View detail', 'http://example.com/page/222', LINEBot.Action.URI);

var column3 = new LINEBot.CarouselColumnTemplateBuilder();
column3.setTitle('this is item 3')
       .setMessage('description')
       .setThumbnail('https://example.com/bot/images/item3.jpg')
       .addAction('Buy', 'action=buy&itemid=333', LINEBot.Action.POSTBACK)
       .addAction('Add to cart', 'action=buy&itemid=333', LINEBot.Action.POSTBACK)
       .addAction('View detail', 'http://example.com/page/333', LINEBot.Action.URI);

var carousel = new LINEBot.CarouselTemplateBuilder([column1, column2, column3]);
```
And after create template, Your must be create instance MessageBuilder before sends;

```js
var template = new LINEBot.TemplateMessageBuilder('this is a buttons template', buttons);
```

#### Webhook
LINE's server sends user action (message, image, location and etc.) to your bot server. Request of that contains event(s); event is action of the user.

Webhook events:
- **MESSAGE** Event name which contains the sent message.
- **FOLLOW** Event name for when your account is added as a friend (or unblocked). You can reply to follow events.
- **UNFOLLOW** Event name for when your account is blocked.
- **JOIN** Event name for when your account joins a group or talk room. You can reply to join events.
- **LEAVE** Event name for when your account leaves a group.
- **POSTBACK** Event name for when a user performs an action on a template message which initiates a postback. You can reply to postback events.
- **BEACON** Event name for when a user detects a LINE Beacon. You can reply to beacon events.

See Also
--

- [https://devdocs.line.me/en/#messaging-api](https://devdocs.line.me/en/#messaging-api)
