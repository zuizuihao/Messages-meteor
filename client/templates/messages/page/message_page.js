Template.messagePage.helpers({
  messagePageItems: function() {
    var selectedUserName = this.username;
    var currentUserName = Meteor.user().username;
    
    var query = {$or : [
        { $and : [ { toUserName : selectedUserName }, { fromUserName : currentUserName} ] },
        { $and : [ { toUserName : currentUserName }, { fromUserName : selectedUserName} ] }
    ]};
    return Messages.find(query, {sort: {sentTime: -1}});
  }
});

Template.messagePage.onRendered(function () {
    Meteor.call('markAllMessageRead', this.data.username, function(error, result) {
      // 显示错误信息并退出
      if (error)
        return alert(error.reason);
    });
});

Template.messagePage.events({
  'submit form': function(e) {
    e.preventDefault();

    var message = {
      toUserName: this.username,
      content: $(e.target).find('[name=userComment]').val()
    };

    Meteor.call('insertMessage', message, function(error, result) {
      // 显示错误信息并退出
      if (error)
        return alert(error.reason);
       
      Router.go('messagePage', {username: result.username});
    });
  }
});