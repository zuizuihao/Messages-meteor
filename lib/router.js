Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
    // client
    return Meteor.subscribe('messages'); 
    }
});

Router.route('/', {
  name: 'messagesList',
  onAfterAction: function () {
    Session.set('pageTitle', "My Messages");
  }
});

Router.route('/friends', {
  name: 'friendsList'
});

Router.route('/messages/:_id', {
  name: 'messagePage',
  onAfterAction: function () {
    var messageItem = Messages.findOne(this.params._id);
    if(messageItem.from)
      Session.set('pageTitle', messageItem.from);
  },
  data: function() { return Messages.findOne(this.params._id); }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'messagePage'});

Router.onBeforeAction(requireLogin, {only: 'messagePage'});


