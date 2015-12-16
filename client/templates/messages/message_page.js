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
      
      // 显示结果，跳转页面
      if (result.messageWithSameContent)
        alert('This message has already been posted.'); 
       
      Router.go('messagePage', {_id: result._id});
    });
  }
});