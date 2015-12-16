Template.messagesList.helpers({
  messages: function() {
    return Messages.find({}, {sort: {sentTime: -1}});
  }
});