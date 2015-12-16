Template.friendItem.events({
    "click .add": function () {
        Meteor.call("addFriend", this._id);
        var user = Meteor.users.findOne({_id: this._id}, {fields: { 'username':1}});
        var message = {
            toUserName: user.username,
            content: "Nice to make friend with you!"
        };
        Meteor.call("insertMessage", message);
    },
    "click .remove": function () {
        Meteor.call("removeFriend", this._id);
        Meteor.call("emptyMessage");
    }
});

Template.friendItem.helpers({
  isFriend: function() {
    if(Meteor.user())
        return Meteor.user().profile.friendList.indexOf(this._id) >= 0;
    return false;
  }
});