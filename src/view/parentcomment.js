var React = require("react/addons");
var styles = require("./styles.js");
var combine = require("../util/styleutil.js");
var renderChildComments = require("./childcomment.js").renderChildComments;
var ChattyActions = require("../store/chattyactions.js");
var AutoscrollingMixin = require("./autoscrollingmixin.js");
var ReplyBox = require("./replybox.js");
var _ = require("lodash");

var ParentComment = React.createClass({
    propTypes: {
      id: React.PropTypes.number.isRequired,
      replyingTo: React.PropTypes.number.isRequired,
      username: React.PropTypes.string.isRequired,
      hidden: React.PropTypes.bool.isRequired,
      latestReply: React.PropTypes.string.isRequired
    },
    render: function() {
      if(this.props.hidden) return null;
      var props = this.props;
      if(props.visibleThreads.length > 0 &&
        !_.find(props.visibleThreads, {threadId: props.id})) {
        return null;
      }
      var replyPosts = null;
      var replies = null;
      if (props.replyCount > 0) {
        if(props.expanded) {
          
          replyPosts = renderChildComments(props.threadId,props.children, 
              props.expandedChildId,props.replyingTo,props.username);
            
          replies = <div><span style={styles.clickable} 
            onClick={this.onCollapseClick}>Collapse</span></div>;

        } else {
          var replyStr = props.replyCount > 1 ? "replies" : "reply";
          replies = <div><span style={styles.clickable} 
              onClick={this.onRepliesClick}>
              {props.replyCount} {replyStr}</span>
              &nbsp;<span style={styles.date}>Latest reply: {props.latestReply.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</span>
            </div>;
        }
      } else {
        replies = <span>No replies</span>;
      }
      var scroller = null;
      if(props.focused) {
        scroller = <AutoscrollingMixin parent={this} />
      } else {
        scroller = null;
      }
      
      var replyBox = null;
      if(props.replyingTo == props.id) {
        replyBox = <ReplyBox parentCommentId={props.id}/>
      }
      
      return (
        <div style={combine(styles.parentContainer)} onClick={this.onParentClick}>
          <div style={styles.parentComment}>
          {scroller}
            <div ref="anchor" style={combine(props.focused && styles.highlightedParent)}>
              <span style={styles.username}>
                {props.author}
              </span>
              @ <span style={styles.date}>{props.date.toLocaleString()}</span>
              <div dangerouslySetInnerHTML={{__html: props.body}} />
              {replies}
            </div>
            {replyBox}
            {replyPosts}
          </div>
        </div>
      );
    },
    onRepliesClick: function() {
      ChattyActions.toggleParentComment(this.props.id);
    },
    onCollapseClick: function() {
      ChattyActions.toggleParentComment(this.props.id);
    },
    onParentClick: function() {
      ChattyActions.highlightParent(this.props.id);
    }
});

module.exports = ParentComment;