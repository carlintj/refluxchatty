var React = require("react/addons");
var ParentComment = require("./parentcomment.js");
var styles = require("./styles.js");

var CommentList = React.createClass({
  render: function() {
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
        />);
    });
    
    return (
      <div style={styles.body}>
        {comments}
      </div>
    );
  }
});

module.exports = CommentList;