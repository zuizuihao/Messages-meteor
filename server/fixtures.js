if (Messages.find().count() === 0) {
  Messages.insert({
    from:"Bob",
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/',
    sentTime: '2015-09-12',
    hasSeen: true
  });

  Messages.insert({
    from:"Ann",
    title: 'Meteor',
    url: 'http://meteor.com',
    sentTime: '2015-09-12',
    hasSeen: true
  });

  Messages.insert({
    from:"HL",
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com',
    sentTime: '2015-09-12',
    hasSeen: false
  });
}