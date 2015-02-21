var React = require("react");
var ParentComment = require("./parentcomment.js");
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
        focused = {comment.focused}
        expandedChildId = {comment.expandedChildId}
        />);
    });
    
    return (
      <div>
        {comments}
      </div>
    );
  }
});

module.exports = CommentList;