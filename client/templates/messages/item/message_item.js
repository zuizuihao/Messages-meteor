Template.messageItem.helpers({
  user: function(){
    var id = this.toString();
    var user = Meteor.users.findOne({_id: id}, {fields: { 'username':1}});
    return user;
  },
  lastMessage: function(){
    return Messages.findOne({}, {sort: {sentTime: -1}});
  }
});