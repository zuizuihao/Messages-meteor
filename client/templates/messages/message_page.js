Template.messagePage.helpers({
  messagePageItems: function() {
    return Messages.find();
  }
});

Template.messagePage.events({
  'submit form': function(e) {
    e.preventDefault();

    var message = {
      title: $(e.target).find('[name=userComment]').val()
    };

    Meteor.call('messageInsert', message, function(error, result) {
      // 显示错误信息并退出
      if (error)
        return alert(error.reason);
      Router.go('messagePage', {_id: result._id});
    });
  }
});