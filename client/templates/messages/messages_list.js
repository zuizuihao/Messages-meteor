var messagesData = [
  {
    from:"Bob",
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/',
    createTime: '2015-09-12',
    hasSeen: true
  }, 
  {
    from:"Ann",
    title: 'Meteor',
    url: 'http://meteor.com',
    createTime: '2015-09-12',
    hasSeen: true
  }, 
  {
    from:"HL",
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com',
    createTime: '2015-09-12',
    hasSeen: false
  }
];
Template.messagesList.helpers({
  messages: messagesData
});