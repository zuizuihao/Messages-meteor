Template.friendsList.helpers({
  friends: function() {
    return Users.find({'_id': {$ne : Meteor.userId()}});
  }
});