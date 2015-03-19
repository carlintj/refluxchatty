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
        replyingTo={_this.props.replyingTo}
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