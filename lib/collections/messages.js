Messages = new Mongo.Collection('messages');

Meteor.methods({
  insertMessage: function(messageAttributes) {
    check(Meteor.userId(), String);
    check(messageAttributes, {
      content: String,
      toUserName: String
    });
    
    var messageWithSameContent = Messages.findOne({content: messageAttributes.content});
    if (messageWithSameContent) {
      return {
        messageExists: true,
        _id: messageWithSameContent._id
      }
    }
    
    var user = Meteor.user();
    var message = _.extend(messageAttributes, {
      fromUserName: user.username,
      hasSeen: false,
      sentTime: new Date()
    });
    var messageId = Messages.insert(message);
    return {
      _id: messageId
    };
  },
  emptyMessage: function(){
    console.log("remove all the messages related.");
  }
});

Messages.allow({
  insert: function(userId, doc) {
    // 只允许登录用户添加帖子
    return !! userId;
  }
});