var React = require("react");
var XDate = require("xdate");
var renderChildComments = require("../util/renderchildcomments.js");
var styles = require("./styles.js");
var styleutil = require("../util/styleutil.js");

var fixComment = function(comment) {
  var div = document.createElement('div');
  div.innerHTML = comment;
  return div.innerHTML;
}

var ChildComment = React.createClass({
  render: function() {
    var dateStr = new XDate(this.props.date);
    var replies = renderChildComments(this.props.children, this.props.onClick,this.props.expandedChildId)
    var expanded = this.props.expandedChildId == this.props.id;
    var comment = null;
    
    if(expanded) {
      comment = this.props.body;
    } else {
      //this needs to be safely escaped to make sure there are no hanging tags.
      comment = this.props.body.substring(0,100);
      if(comment.length != this.props.body.length){
        comment = fixComment(comment) + "...";
      }
    }
    
    return (<div style={styles.commentContainer}>
            <div onClick={this.handleClick} style={styleutil(expanded && styles.highlightedComment)} >
              <div style={styles.userName}>{this.props.author} @ <span style={styles.date}>{dateStr.toLocaleString()}</span></div>
              <div dangerouslySetInnerHTML={{__html: this.props.body}} />
            </div>
              <div>
                {replies}
              </div>
            </div>);
  },
  handleClick : function(e) {
    e.stopPropagation();
    //this.props.onClick(this.props.id);
    //actions.selectComment(this.props.threadId,this.props.id);
  }
});

module.exports = ChildComment;