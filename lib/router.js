Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('messages'); }
});

Router.route('/', {name: 'messagesList'});

Router.route('/messages/:_id', {
  name: 'messagePage',
  data: function() { return Messages.findOne(this.params._id); }
});

Router.onBeforeAction('dataNotFound', {only: 'messagePage'});