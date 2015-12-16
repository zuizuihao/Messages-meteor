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

Router.route('/messages/:username', {
  name: 'messagePage',
  onAfterAction: function () {
      Session.set('pageTitle', this.params.username);
  },
  data: function() { 
      return { username: this.params.username };
  }
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


