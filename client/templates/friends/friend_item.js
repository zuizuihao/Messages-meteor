Template.friendItem.events({
    "click .add": function () {
        Meteor.call("addFriend", this._id);
    },
    "click .remove": function () {
        Meteor.call("removeFriend", this._id);
    }
});

Template.friendItem.helpers({
  isFriend: function() {
    return Meteor.user().profile.friendList.indexOf(this._id) >= 0;
  }
});