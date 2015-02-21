var ChildComment = require("../view/childcomment.js");
var React = require("react");

var renderChildComments = function(children, expandedChildId) {
  var replies = children.map(function(comment,i) {
    return (<ChildComment key={comment.id} 
    id = {comment.id}
    author={comment.author} 
    body={comment.body} 
    children = {comment.children}
    date = {comment.date} 
    expandedChildId = {expandedChildId}
    />);
  });
  return replies;
}

module.exports = renderChildComments;