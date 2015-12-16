Template.header.helpers({
  pageTitle: function() { 
      var pageTitle = Session.get('pageTitle');
      return pageTitle ? pageTitle : "My Messages";
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
  },
  isMessageListView: function(){
    return Session.get('pageTitle') == "My Messages";
  }
});

Template.header.rendered = function() {
   // is this called once all of its 'subviews' are rendered?
};