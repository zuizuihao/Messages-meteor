// Define a collection to hold our messages
Messages = new Mongo.Collection("messages");

Meteor.startup(function () {
  // Use Meteor.startup to render the component after the page is ready
  React.render(<App />, document.getElementById("render-target"));
});


Meteor.methods({
  addMessage(toId, text) {
    Messages.insert({
      text: text,
      createdAt: new Date(),
      fromId: Meteor.userId(),
      toId: toId,
      isSeen: false
    });
  },

  removeMessage(messageId) {
    const message = Messages.findOne(messageId);
    Messages.remove(messageId);
  },

  setMessageSeen(messageId, isSeen) {
    const message = Messages.findOne(messageId);
    Messages.update(messageId, { $set: { isSeen: isSeen} });
  }
});