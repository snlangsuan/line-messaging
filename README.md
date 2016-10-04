# line-messaging

==

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

### Create the bot client instance

Instance of bot client is a handler of the Messaging API.

```js
var bot = new LINEBot ({
  channelID: '<your channel ID>',
  channelSecret: '<your channel secret>',
  channelToken: '<your channel token>'
})
```

### Call API

You can call API through the bot client instance.

sample is following;

```js
bot.replyText('<reply token>', 'hello!').then(function(data) {
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

LINEBot.replyMessage() takes reply token and MessageBuilder. This method sends message that is built by MessageBuilder to the destination.

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
