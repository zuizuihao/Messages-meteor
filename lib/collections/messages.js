Messages = new Mongo.Collection('messages');

Meteor.methods({
  messageInsert: function(messageAttributes) {
    check(Meteor.userId(), String);
    check(messageAttributes, {
      title: String
    });
    
    var messageWithSameContent = Messages.findOne({title: messageAttributes.title});
    if (messageWithSameContent) {
      return {
        messageExists: true,
        _id: messageWithSameContent._id
      }
    }
    
    var user = Meteor.user();
    var message = _.extend(messageAttributes, {
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