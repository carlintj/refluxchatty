import React from 'react';
import ParentComment from './parentcomment.js';
import _ from 'lodash';

var styles = {
  commentBody: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
};

class CommentList extends React.Component {
  render() {
    let {replyingTo, visibleThreads, username, chattyActions, userActions, threads, password} = this.props;
    var comments = _.map(threads, comment => {
      return (<ParentComment key={comment.id}
        id={comment.id}
        author={comment.author}
        body={comment.body}
        children = {comment.children}
        replyCount = {comment.replyCount}
        seenReplyCount = {comment.seenReplyCount}
        date = {comment.date}
        dateStr = {comment.dateStr}
        expanded = {comment.expanded}
        expandedChildId = {comment.expandedChildId}
        threadId={comment.id}
        focused={comment.focused}
        hidden={comment.hidden}
        latestReply={comment.latestReplyStr}
        category={comment.category}
        searchMatch={comment.searchMatch}

        replyingTo={replyingTo}
        visibleThreads={visibleThreads}
        username={username}
        password={password}
        chattyActions={chattyActions}
        userActions={userActions}
        />);
    });
    
    return (
      <div style={styles.commentBody}>
        {comments}
      </div>
    );
  }
}

module.exports = CommentList;