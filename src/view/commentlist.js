var React = require("react/addons");
var ParentComment = require("./parentcomment.js");
var styles = require("./styles.js");

var CommentList = React.createClass({
  render: function() {
    var _this = this;
    var comments = this.props.threads.map(function(comment,i) {
      return (<ParentComment key={comment.id}
        id={comment.id}
        author={comment.author} 
        body={comment.body} 
        children = {comment.children}
        replyCount = {comment.replyCount}
        date = {comment.date} 
        expanded = {comment.expanded}
        expandedChildId = {comment.expandedChildId}
        threadId={comment.id}
        focused={comment.focused}
        hidden={comment.hidden}
        latestReply={comment.latestReply}
        replyingTo={_this.props.replyingTo}
        visibleThreads={_this.props.visibleThreads}
        username={_this.props.username}
        />);
    });
    
    return (
      <div style={styles.commentBody}>
        {comments}
      </div>
    );
  }
});

module.exports = CommentList;