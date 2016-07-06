var React = require('react');
var styleutil = require('../../util/styleutil.js');
var AutoscrollingMixin = require('../misc/autoscrollingmixin.js');
var ReplyBox = require('./replybox.js');
var ReplyButton = require('./replybutton.js');
var PostBody = require('./postbody.js');

var styles = {
  highlightedComment: {
    background: '#E0F3FF',
    //fontSize: '0.8em',
    whiteSpace: 'normal',
    border: '1px solid #cddaf3',
    padding: '2px',
  },
  commentExpandedInformative: {
    border: '2px solid #0003FD',
  },
  commentExpandedNWS: {
    border: '2px solid #FF0000',
  },
  commentContainer: {
    marginLeft: 12,
    borderLeft: '1px solid #cdced0',
    //fontSize: '1em',
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
    if(props.category === 'informative') {
      commentStyle = styleutil(commentStyle,styles.commentExpandedInformative);
    } else if(props.category === 'nws') {
      commentStyle = styleutil(commentStyle,styles.commentExpandedNWS);
    }

    return (<div style={styles.commentContainer}>
            <div ref="anchor" onClick={this.handleClick} style={commentStyle}>
              <div style={styles.username}>
                {props.author} @ <span style={styles.date}>{props.dateStr}</span>
                <ReplyButton threadId = {props.threadId} commentId = {props.id} />
              </div>
              <div>
                <PostBody body={props.body} />
              </div>
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