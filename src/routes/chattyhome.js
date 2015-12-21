var React = require("react");
var Chatty = require("../view/chatty.js");

module.exports = React.createClass({
  render: function () {
    return (
      <Chatty threads={this.props.ChattyStore.threads} 
        visibleThreads={this.props.ChattyStore.visibleThreads}
        replyingTo={this.props.ChattyStore.replyingTo} 
        username={this.props.UserStore.username}
      />);
  }
});