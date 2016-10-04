BaseEvent.SOURCE_TYPE = {
  USER: 'user',
  GROUP: 'group',
  ROOM: 'room'
};

BaseEvent.TYPE = {
  MESSAGE: 'message',
  FOLLOW: 'follow',
  UNFOLLOW: 'unfollow',
  JOIN: 'join',
  LEAVE: 'leave',
  POSTBACK: 'postback',
  BEACON: 'beacon'
};

function BaseEvent(event) {
  var that = this;

  this.getEvent = function() {
    return event;
  }

  this.getType = function() {
    return event.type;
  }

  this.isType = function(type) {
    return ( event.type == type);
  }

  this.getTimestamp = function() {
    return event.timestamp;
  }

  this.getReplyToken = function() {
    return ( !(token = event.replyToken) )? null: token;
  }

  this.isUserEvent = function() {
    return event.source.type === BaseEvent.SOURCE_TYPE.USER;
  }

  this.isGroupEvent = function() {
    return event.source.type === BaseEvent.SOURCE_TYPE.GROUP;
  }

  this.isRoomEvent = function() {
    return event.source.type === BaseEvent.SOURCE_TYPE.ROOM;
  }

  this.getUserId = function() {
    if ( !that.isUserEvent() ) throw new Error('This event source is not a user type');

    return ( !(userId = event.source.userId) )? null: userId;
  }

  this.getGroupId = function() {
    if ( !that.isGroupEvent() ) throw new Error('This event source is not a group type');

    return ( !(groupId = event.source.groupId) )? null: groupId;
  }

  this.getRoomId = function() {
    if ( !that.isRoomEvent() ) throw new Error('This event source is not a room type');

    return ( !(roomId = event.source.roomId) )? null: roomId;
  }
}

module.exports = BaseEvent;
