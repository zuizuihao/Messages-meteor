// Message component - represents a single todo item
Message = React.createClass({
  propTypes: {
    // This component gets the message to display through a React prop.
    // We can use propTypes to indicate it is required
    message: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li>{this.props.message.text}</li>
    );
  }
});