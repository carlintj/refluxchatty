var React = require("react/addons");
var styleutil = require("../../util/styleutil.js");
var AutoscrollingMixin = require("../misc/autoscrollingmixin.js");
var ReplyBox = require("./replybox.js");

var styles = {
  highlightedComment: {
    background: '#E0F3FF',
    //marginLeft: 10,
    fontSize: 13,
    //padding: 2,
    whiteSpace: 'normal'
  },
  commentExpandedInformative: {
    border: '2px solid #0003FD',
  },
  commentExpandedNWS: {
    border: '2px solid #FF0000',
  },
  commentContainer: {
    marginLeft: 12,
    //marginTop: 2,
    borderLeft: '1px solid #cdced0',
    //borderTop: '1px solid #cdced0',
    //borderRadius: '5px',
    //padding: '2px',
    fontSize: 11,
    whiteSpace: 'nowrap'
  },
  username: {
    color: '#3F82C5'
  },
  date: {
    fontSize: 10
  },
};

module.exports = React.createClass({
  render: function() {
    var props = this.props;
    var replyBox = null;
    
    if(props.replyingTo == props.id) {
      replyBox = <ReplyBox parentCommentId={props.id}/>;
    }
    
    var commentStyle = styles.highlightedComment;
    if(props.category === "informative") {
      commentStyle = styleutil(commentStyle,styles.commentExpandedInformative);
    } else if(props.category === "nws") {
      commentStyle = styleutil(commentStyle,styles.commentExpandedNWS);
    }
    
    return (<div style={styles.commentContainer}>
            <div ref="anchor" onClick={this.handleClick} style={commentStyle}>
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