// App component - represents the whole app
App = React.createClass({
  getMessages() {
    return [
      { _id: 1, text: "This is message 1" },
      { _id: 2, text: "This is message 2" },
      { _id: 3, text: "This is message 3" }
    ];
  },
 
  renderMessages() {
    return this.getMessages().map((message) => {
      return <Message key={message._id} message={message} />;
    });
  },
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Messages</h1>
        </header>
 
        <ul>
          {this.renderMessages()}
        </ul>
      </div>
    );
  }
});