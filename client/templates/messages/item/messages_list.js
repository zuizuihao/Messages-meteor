Template.messagesList.helpers({
  friendList: function() {
    return Meteor.user().profile.friendList;
  }
});