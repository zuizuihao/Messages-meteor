Meteor.publish('messages', function() {
  return Messages.find();
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({}, {fields: {'username': 1, 'profile': 1}});
  } else {
    this.ready();
  }
});