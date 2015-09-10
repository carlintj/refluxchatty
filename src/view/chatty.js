var React = require("react/addons");
var CommentList = require("./posts/commentlist.js");
var ChattyActions = require("../store/chattyactions.js");
var keymaster = require("keymaster");

//TODO add unmount for deregistering keymaster
module.exports = React.createClass({
    componentDidMount: function () {
        ChattyActions.startChatty();
        
        keymaster('j', function() {
           ChattyActions.selectNextParent();
        });
        keymaster('k', function() {
            ChattyActions.selectPrevParent(); 
        });
        keymaster('x', function() {
            ChattyActions.toggleParentComment();
        });
        keymaster('r', function() {
          ChattyActions.openReply();
        });
        keymaster('home', function() {
            ChattyActions.selectFirstParent();
        });
        keymaster('end', function() {
            ChattyActions.selectLastParent();
        });
        keymaster('h', function() {
            ChattyActions.hideSelectedThread();
        });
        keymaster('f', () => {
          this.setState({showSearch: !this.state.showSearch});
        });
    },
    componentWillUnmount: function() {
      ChattyActions.pauseChatty();
      keymaster.unbind('j');
      keymaster.unbind('k');
      keymaster.unbind('x');
      keymaster.unbind('r');
      keymaster.unbind('home');
      keymaster.unbind('end');
      keymaster.unbind('h');
      keymaster.unbind('f');
    },
    render: function() {
      return (<div>
        <CommentList threads={this.props.threads} 
          visibleThreads={this.props.visibleThreads}
          replyingTo={this.props.replyingTo} 
          username={this.props.username}/>
      </div>);
    }
});