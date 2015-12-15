Template.messageItem.helpers({
  userName: function() {
    return this.from;
  },
  sentTimeFormated: function(){
   return this.sentTime;
  }
});