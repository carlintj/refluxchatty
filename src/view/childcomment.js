var React = require("react/addons");
var XDate = require("xdate");
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

var renderChildComments = function(threadId,children,expandedChildId,replyingTo) {
    var replies = children.map(function(comment,i) {
        return (<ChildComment key={comment.id} 
        id = {comment.id}
        author={comment.author} 
        body={comment.body} 
        children = {comment.children}
        date = {comment.date} 
        expandedChildId = {expandedChildId} 
        threadId={threadId} 
        replyingTo={replyingTo} />);
      });
    return replies;
  };

var ChildComment = React.createClass({
   propTypes: {
    //date: React.PropTypes.date.isRequired,
    threadId: React.PropTypes.number.isRequired,
    //children: React.PropTypes.array.isRequired,
    expandedChildId: React.PropTypes.number.isRequired,
    replyingTo: React.PropTypes.number.isRequired,
    body: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired
    
  },
  render: function() {
    var dateStr = new XDate(this.props.date);
    var replies = renderChildComments(this.props.threadId,this.props.children, 
      this.props.expandedChildId, this.props.replyingTo);
    var expanded = this.props.expandedChildId == this.props.id;
    
    var comment = null;
    var replyBox = null;
    
    if(expanded) {
      comment = this.props.body;
      if(this.props.replyingTo === this.props.id) {
        replyBox = <ReplyBox parentCommentId={this.props.id}/>
      }
    } else {
      //this needs to be safely escaped to make sure there are no hanging tags.
      comment = this.props.body.substring(0,200);
      if(comment.length != this.props.body.length){
        comment = fixComment(comment + "...");
      }
    }
    
    var scroller = null;
      if(expanded) {
        scroller = <AutoscrollingMixin parent={this} />
      }
      else {
        scroller = null;
      }
    return (<div style={styles.commentContainer}>
            <div ref="anchor" onClick={this.handleClick} style={styleutil(expanded && styles.highlightedComment)} >
              <div style={styles.userName}>
                {this.props.author} @ <span style={styles.date}>{dateStr.toLocaleString()}</span>
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