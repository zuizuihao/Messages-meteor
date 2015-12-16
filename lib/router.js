(function(){Router.configure({
  layoutTemplate: 'appBody',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe("userData"),
      Meteor.subscribe('messages') 
    ];
  }
});

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.route('join');
Router.route('signin');

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


Router.route('/', {
  name: 'messagesList',
  onAfterAction: function () {
    Session.set('pageTitle', "My Messages");
  }
});


Router.onBeforeAction('dataNotFound', {only: 'messagePage'});

//Router.onBeforeAction(requireLogin, {only: 'messagePage'});

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
}).call(this);

