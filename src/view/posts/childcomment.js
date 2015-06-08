var React = require("react/addons");
var styleutil = require("../../util/styleutil.js");
var ChattyActions = require("../../store/chattyactions.js");
var ChildCommentCollapsed = require("./childcommentcollapsed.js");
var ChildCommentExpanded = require("./childcommentexpanded.js");

var fixComment = function(comment) {
  var div = document.createElement('div');
  div.innerHTML = comment;
  return div.innerHTML;
};
var renderChildComments = function(threadId,children,expandedChildId,replyingTo,username) {
  var replies = children.map(function(comment,i) {
    return (<ChildComment key={comment.id} 
    id = {comment.id}
    author={comment.author} 
    body={comment.body} 
    children = {comment.children}
    date = {comment.date} 
    dateStr = {comment.dateStr}
    expandedChildId = {expandedChildId} 
    threadId={threadId} 
    replyingTo={replyingTo}
    category={comment.category}
    username={username}/>);
  });
  return replies;
};

var ChildComment = React.createClass({
  propTypes: {
    date: React.PropTypes.string.isRequired, //date isn't a proptype
    threadId: React.PropTypes.number.isRequired,
    children: React.PropTypes.array.isRequired,
    expandedChildId: React.PropTypes.number.isRequired,
    replyingTo: React.PropTypes.number.isRequired,
    body: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    username: React.PropTypes.string.isRequired,
    catch: React.PropTypes.string.isRequired
  },
  render: function() {
    var props = this.props;
    var replies = renderChildComments(props.threadId,props.children, 
      props.expandedChildId, props.replyingTo,props.username);
    var expanded = props.expandedChildId == props.id;
    
    if(!expanded) {
      return (
        <ChildCommentCollapsed body={props.body} author={props.author} 
        date={props.date}
        onClickEvent={this.handleClick}
        username={props.username}
        category={props.category}>
          {replies}
        </ChildCommentCollapsed>
      );
    } else {
      return (
        <ChildCommentExpanded body={props.body} author={props.author} dateStr={props.dateStr}
          id={props.id}
          replyingTo={props.replyingTo}
          category={props.category}>
          {replies}
        </ChildCommentExpanded>
      );
    }
  },
  handleClick : function(e) {
    e.stopPropagation();
    ChattyActions.selectComment(this.props.threadId,this.props.id);
  }
});

module.exports = { ChildComment : ChildComment,renderChildComments : renderChildComments };