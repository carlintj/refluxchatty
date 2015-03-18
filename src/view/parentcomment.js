var React = require("react/addons");
var XDate = require("xdate");
var styles = require("./styles.js");
var combine = require("../util/styleutil.js");
var renderChildComments = require("./childcomment.js").renderChildComments;
var ChattyActions = require("../store/chattyactions.js");
var AutoscrollingMixin = require("./autoscrollingmixin.js");
var ReplyBox = require("./replybox.js");

var ParentComment = React.createClass({
    propTypes: {
      id: React.PropTypes.number.isRequired,
      replyingTo: React.PropTypes.number.isRequired
    },
    render: function() {
      var dateStr = new XDate(this.props.date);
      var replies = null;
      if (this.props.replyCount > 0) {
        if(this.props.expanded) {
          replies = renderChildComments(this.props.threadId,this.props.children, 
            this.props.expandedChildId,this.props.replyingTo);
            
          replies = <div>
                      <div><span style={styles.clickable} onClick={this.onCollapseClick}>Collapse</span></div>
                      {replies}
                    </div>;
        }
        else {
          var replyStr = this.props.replyCount > 1 ? "replies" : "reply";
          replies = <span style={styles.clickable} onClick={this.onRepliesClick}>{this.props.replyCount} {replyStr}</span>;
        }
      }
      else {
        replies = <span>No replies</span>;
      }
      var scroller = null;
      if(this.props.focused) {
        scroller = <AutoscrollingMixin parent={this} />
      }
      else {
        scroller = null;
      }
      
      var replyBox = null;
      if(this.props.replyingTo == this.props.id) {
        replyBox = <ReplyBox parentCommentId={this.props.id}/>
      }
      
      return (
        <div style={combine(styles.parentContainer)} onClick={this.onParentClick}>
          {scroller}
          <div ref="anchor" style={combine(this.props.focused && styles.highlightedParent)}>
            <span style={styles.userName}>
              {this.props.author}
            </span>
            @ <span style={styles.date}>{dateStr.toLocaleString()}</span>
            <div dangerouslySetInnerHTML={{__html: this.props.body}} />
          </div>
          {replyBox}
          <div>
            {replies}
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