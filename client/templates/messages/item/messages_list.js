Template.messagesList.helpers({
  messageList: function() {
    var ret = [];
    var messages = Messages.find({toUserName : Meteor.user().username }).fetch();
    var groupedFromUserNames = _.groupBy(messages, function(message){ return message.fromUserName; });
    _.each(_.values(groupedFromUserNames), function(list) {
        list.sort(function(a,b){return new Date(b.sentTime) - new Date(a.sentTime);});
        ret.push(list[0]);
    });
    return ret.sort(function(a, b){return a.hasSeen > b.hasSeen});
  },
  unreadMessageCount: function(){
    var count = 0;
    if(Meteor.user()){
      var ret = [];
      var messages = Messages.find({toUserName : Meteor.user().username }).fetch();
      var groupedFromUserNames = _.groupBy(messages, function(message){ return message.fromUserName; });
      _.each(groupedFromUserNames, function(m){
        if(_.some(m, function(n){ return !n.hasSeen; })){
           count++;
        }
      });
    }
    return count;
  },
  totalMessageCount: function(){
    var count = 0;
    if(Meteor.user()){
      var ret = [];
      var messages = Messages.find({toUserName : Meteor.user().username }).fetch();
      var groupedFromUserNames = _.groupBy(messages, function(message){ return message.fromUserName; });
      _.each(groupedFromUserNames, function(m){
           count++;
      });
    }
    return count;
  }
});