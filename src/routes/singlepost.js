var React = require("react/addons");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var ChattyActions = require("../store/chattyactions.js");
var ParentComment = require("../view/posts/parentcomment.js");
var _ = require("lodash");

var styles = {
  commentBody : {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'Helvetica,Arial,sans-serif',
    fontSize: 13,
  },
};

var SinglePost =  React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      threadId: null,
      postId: null,
      focused : false
    };
  },
  componentWillReceiveProps: function(nextProps) {
    var { router } = this.context;
    var threadId = router.getCurrentQuery().threadId;
    var postId = router.getCurrentQuery().postId;
    if(this.state.threadId != threadId) {
      this.setState({
        threadId: Number(threadId),
        postId: Number(postId),
        focused: false,
      });
      ChattyActions.loadPostIfNotFound(threadId);
    } else if(!this.state.focused) {
        var t = this.props.ChattyStore.findThreadByPostId(threadId);
        if (t) {
          ChattyActions.selectComment(t.id,this.state.postId);
          this.setState({focused: true});
        }
      }
  },
  render: function () {
    if(!this.state.threadId) return null;
    var comment = this.props.ChattyStore.findThreadByPostId(this.state.threadId);
    if(!comment) { 
      return null;
    }

    
    return <div style={styles.commentBody}>
      <ParentComment key={comment.id}
        id={comment.id}
        author={comment.author} 
        body={comment.body} 
        children = {comment.children}
        replyCount = {comment.replyCount}
        date = {comment.date}
        dateStr = {comment.dateStr}
        expanded = {true}
        expandedChildId = {comment.expandedChildId}
        threadId={comment.id}
        focused={comment.focused}
        hidden={false}
        latestReply={comment.latestReplyStr}
        replyingTo={this.props.ChattyStore.replyingTo}
        visibleThreads={[]}
        username={this.props.UserStore.username}
        category={comment.category}
        searchMatch={comment.searchMatch}
        />

    </div>;
  }
});

module.exports = SinglePost;