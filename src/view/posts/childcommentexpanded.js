import React from 'react';
import styleutil from '../../util/styleutil.js';
import AutoscrollingMixin from '../misc/autoscrollingmixin.js';
import ReplyBox from './replybox.js';
import ReplyButton from './replybutton.js';
import PostBody from './postbody.js';

var styles = {
  highlightedComment: {
    background: '#FFFFFF',
    //fontSize: '0.8em',
    whiteSpace: 'normal',
    border: '1px solid #cddaf3',
    padding: '2px',
    color: '#000000'
  },
  commentExpandedInformative: {
    border: '2px solid #0003FD',
  },
  commentExpandedNWS: {
    border: '2px solid #FF0000',
  },
  commentExpandedNuked: {
    border: '2px solid #A411FF',
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


class ChildCommentExpanded extends React.Component {
  render() {
    var props = this.props;

    var replyBox = null;
    if (props.replyingTo == props.id) {
      replyBox = <ReplyBox parentCommentId={props.id} username={props.username}
        password={props.password} chattyActions={props.chattyActions}/>;
    }

    var commentStyle = styles.highlightedComment;
    if (props.category === 'informative') {
      commentStyle = styleutil(commentStyle, styles.commentExpandedInformative);
    } else if (props.category === 'nws') {
      commentStyle = styleutil(commentStyle, styles.commentExpandedNWS);
    } else if (props.category === 'nuked') {
      commentStyle = styleutil(commentStyle, styles.commentExpandedNuked);
    }

    return (
      <div style={styles.commentContainer}>
        <div ref="anchor" onClick={this.handleClick} style={commentStyle}>
          <div style={styles.username}>
            {props.author} @<span style={styles.date}>{props.dateStr}</span>
            <ReplyButton threadId = {props.threadId} commentId = {props.id}
              chattyActions={props.chattyActions}/>
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
  }

  handleClick = (e) => {
    e.stopPropagation();
  };
}

module.exports = ChildCommentExpanded;