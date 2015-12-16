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
        username: messageAttributes.toUserName
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
      username: messageAttributes.toUserName
    };
  },
  emptyMessage: function(){
    console.log("remove all the messages related.");
  },
  findAllMessages: function(fromUserName){
    var toUserName = Meteor.user().username;
    var query = {$or : [
        { $and : [ { toUserName : fromUserName }, { fromUserName : toUserName} ] },
        { $and : [ { fromUserName : toUserName }, { toUserName : fromUserName} ] }
    ]};
    return Messages.find(query, {sort: {sentTime: -1}});
  },
  markAllMessageRead: function(fromUserName){
    var toUserName = Meteor.user().username;
    var query = {$and : [ { fromUserName : fromUserName }, { toUserName : toUserName} ]};
    var setPara = { $set: { hasSeen: true } };
    console.log("mark all message read "+fromUserName);
    Messages.update(query, setPara, { multi: true });
  }
});

Messages.allow({
  insert: function(userId, doc) {
    // 只允许登录用户添加帖子
    return !! userId;
  }
});