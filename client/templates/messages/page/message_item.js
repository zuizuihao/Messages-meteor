Template.messageItem.helpers({
  user: function(){
    var user = Meteor.users.findOne({_id: this.toString()}, {fields: { 'username':1}});
    return user;
  },
  lastMessage: function(){
    var fromUserName = Meteor.users.findOne({_id: this.toString()}, {fields: { 'username':1}}).username;
    var toUserName = Meteor.user().username;
    var query = {$and : [{ fromUserName : fromUserName}, { toUserName : toUserName }]};
    return Messages.findOne(query, {sort: {sentTime: -1}});
  },
  markUnread: function(){
    var user = Meteor.users.findOne({_id: this.toString()}, {fields: { 'username':1}});
    var fromUserName = user.username;
    var toUserName = Meteor.user().username;
    var query = {$and : [ { fromUserName : fromUserName }, { toUserName : toUserName}, {hasSeen: false} ]};
    return Messages.findOne(query);
  }
});