Users = Meteor.users;

Meteor.methods({
    addFriend: function (friendId) {
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      var user = Meteor.user();
      console.log("add friend " + user.username);
      Meteor.users.update(user
      , { $addToSet: { 'profile.friendList' : friendId }}
      );
    },
    removeFriend: function (friendId) {
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      
      console.log("remove friend "+Meteor.userId());
      Meteor.users.update({_id: Meteor.userId()}
        ,{ $pull: { 'profile.friendList' : friendId }}
      );
    }
});

Users.allow({
  insert: function(userId, doc) {
    // 只允许登录用户添加帖子
    return !! userId;
  }
});