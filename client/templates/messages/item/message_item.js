Template.messageItem.helpers({
  markUnread: function(){
    var fromUserName = this.fromUserName;
    var toUserName = Meteor.user().username;
    var query = {$and : [ { fromUserName : fromUserName }, { toUserName : toUserName}, {hasSeen: false} ]};
    return Messages.findOne(query, { multi: true });
  },
  sentTimeFormated: function(){
    return moment(this.sentTime).fromNow();
  }
});