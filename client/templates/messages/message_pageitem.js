Template.messagePageItem.helpers({
  userName: function() {
    if(this.from){
      console.log(this.from);
      return this.from;
    }
    
    var user = Meteor.users.findOne({_id: this.fromId});
    if(user)
      return user.username;
    return undefined;
  },
  sentTimeFormated: function(){
   return this.sentTime;
  }
});