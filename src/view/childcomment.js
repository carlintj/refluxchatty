var React = require("react/addons");
var styles = require("./styles.js");
var styleutil = require("../util/styleutil.js");
var ChattyActions = require("../store/chattyactions.js");
var AutoscrollingMixin = require("./autoscrollingmixin.js");
var ReplyBox = require("./replybox.js");

var fixComment = function(comment) {
  var div = document.createElement('div');
  div.innerHTML = comment;
  return div.innerHTML;
};

var calculateAgeStyle = function(date) {
  var now = Date.now();
  var delta = (now - date)/60000;

  if(delta < 1) {
    return styles.commentAge1;
  } else if(delta < 2) {
    return styles.commentAge3;
  } else if(delta < 5) {
    return styles.commentAge5;
  } else if(delta < 10) {
    return styles.commentAge6;
  } else if (delta < 20) {
    return styles.commentAge7;
  } else if(delta < 30) {
    return styles.commentAge8;
  }
  return null;
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
    username: React.PropTypes.string.isRequired
  },
  render: function() {
    var props = this.props;
    var replies = renderChildComments(props.threadId,props.children, 
      props.expandedChildId, props.replyingTo,props.username);
    var expanded = props.expandedChildId == props.id;
    
    var comment = null;
    var replyBox = null;
    
    if(expanded) {
      comment = props.body;
      if(props.replyingTo === props.id) {
        replyBox = <ReplyBox parentCommentId={props.id}/>
      }
    } else {
      //this needs to be safely escaped to make sure there are no hanging tags.
      comment = props.body.substring(0,200);
      if(comment.length != props.body.length){
        comment = fixComment(comment + "...");
      }
    }
    
    var scroller = null;
      if(expanded) {
        scroller = <AutoscrollingMixin parent={this} />
      } else {
        scroller = null;
      }
    var ageStyle = calculateAgeStyle(props.date);
    var commentStyle = styleutil(
      ageStyle,
      props.username==props.author && styles.ownerPost,
      expanded && styles.highlightedComment
    );
    
    return (<div style={styles.commentContainer}>
            <div ref="anchor" onClick={this.handleClick} style={commentStyle} >
              <div style={styles.username}>
                {props.author} @ <span style={styles.date}>{props.dateStr}</span>
                {scroller}
              </div>
              <div dangerouslySetInnerHTML={{__html: comment}} />
            </div>
            {replyBox}
              <div>
                {replies}
              </div>
            </div>);
  },
  handleClick : function(e) {
    e.stopPropagation();
    ChattyActions.selectComment(this.props.threadId,this.props.id);
  }
});

module.exports = { ChildComment : ChildComment,renderChildComments : renderChildComments };