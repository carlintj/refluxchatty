var React = require("react");
//var keymaster = require("keymaster");
var XDate = require("xdate");
var styles = require("./styles.js");
var renderChildComments = require("./childcomment.js").renderChildComments;
var ChattyActions = require("../store/chattyactions.js");

function isElementInViewport (el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

var ParentComment = React.createClass({
    getInitialState: function() {
      return ({
        hasAnchored : false
      });
    },
    render: function() {
      var dateStr = new XDate(this.props.date);
      var replies = null;
      if (this.props.replyCount > 0) {
        if(this.props.expanded) {
          replies = renderChildComments(this.props.threadId,this.props.children, this.props.expandedChildId);
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
    },
    onCollapseClick: function() {
      ChattyActions.collapseParentComment(this.props.id);
    },
    componentDidUpdate: function() {
      
    }
});

module.exports = ParentComment;