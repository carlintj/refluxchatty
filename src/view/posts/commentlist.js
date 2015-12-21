var React = require("react");
var ParentComment = require("./parentcomment.js");

var styles = {
  commentBody : {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
};

module.exports = React.createClass({
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
        dateStr = {comment.dateStr}
        expanded = {comment.expanded}
        expandedChildId = {comment.expandedChildId}
        threadId={comment.id}
        focused={comment.focused}
        hidden={comment.hidden}
        latestReply={comment.latestReplyStr}
        replyingTo={_this.props.replyingTo}
        visibleThreads={_this.props.visibleThreads}
        username={_this.props.username}
        category={comment.category}
        searchMatch={comment.searchMatch}
        />);
    });
    
    return (
      <div style={styles.commentBody}>
        {comments}
      </div>
    );
  }
});