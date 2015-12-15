if (Messages.find().count() === 0) {
  Messages.insert({
    from:"Bob",
    title: 'Introducing Telescope',
    sentTime: '2015-09-12',
    hasSeen: true
  });

  Messages.insert({
    from:"Ann",
    title: 'Meteor',
    sentTime: '2015-09-12',
    hasSeen: true
  });

  Messages.insert({
    from:"HL",
    title: 'The Meteor Book',
    sentTime: '2015-09-12',
    hasSeen: false
  });
}