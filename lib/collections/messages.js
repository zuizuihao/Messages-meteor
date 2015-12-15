Messages = new Mongo.Collection('messages');

Meteor.methods({
  messageInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String
    });
    var user = Meteor.user();
    var message = _.extend(postAttributes, {
      from: user.username,
      fromId: user._id,
      hasSeen: false,
      sentTime: new Date()
    });
    var messageId = Messages.insert(message);
    return {
      _id: messageId
    };
  }
});

Messages.allow({
  insert: function(userId, doc) {
    // 只允许登录用户添加帖子
    return !! userId;
  }
});