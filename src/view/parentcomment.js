var React = require("react");
var keymaster = require("keymaster");
var XDate = require("xdate");
var styles = require("./styles.js");
var styleutil = require("../util/styleutil.js");
var renderChildComments = require("../util/renderchildcomments.js");
var ChattyActions = require("../store/chattyactions.js");
var ChildComment = require("./childcomment.js");

var ParentComment = React.createClass({
    render: function() {
      var dateStr = new XDate(this.props.date);
      var replies = null;
      if (this.props.replyCount > 0) {
        if(this.props.focused) {
          replies = renderChildComments(this.props.threadId,this.props.children, this.props.expandedChildId);
        }
        else {
          var replyStr = this.props.replyCount > 1 ? "replies" : "reply";
          replies = <span style={styles.clickable} onClick={this.onRepliesClick}>{this.props.replyCount} {replyStr}</span>
        }
      }
      else {
        replies = <span>No replies</span>;
      }
      return (
        <div style={styles.parentContainer}>
          <span style={styles.userName}>
            {this.props.author}
          </span>
          @ <span style={styles.date}>{dateStr.toLocaleString()}</span>
          <div dangerouslySetInnerHTML={{__html: this.props.body}} />
          <div>
            {replies}
          </div>
        </div>
      );
    },
    onRepliesClick: function() {
      ChattyActions.expandParentComment(this.props.id);
    }
});

module.exports = ParentComment;