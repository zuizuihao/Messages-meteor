Users = Meteor.users;

Meteor.methods({
    addFriend: function (friendId) {
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      var userId = Meteor.user();
      console.log("add friend "+userId);
      Meteor.users.update(userId
      , { $addToSet: { 'profile.friendList' : friendId }}
      );
    },
    removeFriend: function (friendId) {
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      var userId = Meteor.user();
      console.log("remove friend "+userId);
      Meteor.users.update(userId
      ,{ $pull: { 'profile.friendList' : {$in : [ friendId ]} }}
      );
    }
});