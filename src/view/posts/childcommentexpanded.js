var React = require("react/addons");
var styles = require("../misc/styles.js");
var styleutil = require("../../util/styleutil.js");
var AutoscrollingMixin = require("../misc/autoscrollingmixin.js");
var ReplyBox = require("./replybox.js");

module.exports = React.createClass({
  render: function() {
    var props = this.props;
    var replyBox = null;
    
    if(props.replyingTo == props.id) {
      replyBox = <ReplyBox parentCommentId={props.id}/>;
    }
    
    return (<div style={styles.commentContainer}>
            <div ref="anchor" onClick={this.handleClick} style={styles.highlightedComment}>
              <div style={styles.username}>
                {props.author} @ <span style={styles.date}>{props.dateStr}</span>
              </div>
              <div dangerouslySetInnerHTML={{__html: props.body}} />
            </div>
            {replyBox}
            <div>
              {props.children}
            </div>
            <AutoscrollingMixin parent={this} />
          </div>
    );
  },
  handleClick: function(e) {
    e.stopPropagation();
  }
});