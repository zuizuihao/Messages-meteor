Template.messagePageItem.helpers({
  sentTimeFormated: function(){
    return moment(this.sentTime).fromNow();
  }
});