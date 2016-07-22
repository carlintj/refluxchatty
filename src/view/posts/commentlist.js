var React = require('react');
var ParentComment = require('./parentcomment.js');
import _ from 'lodash';

var styles = {
  commentBody: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
};

module.exports = React.createClass({
  render: function () {
    let {replyingTo, visibleThreads, username, chattyActions, userActions, threads} = this.props;
    var comments = _.map(threads, comment => {
      return (<ParentComment key={comment.id}
        id={comment.id}
        author={comment.author}
        body={comment.body}
        children = {comment.children}
        replyCount = {comment.replyCount}
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
});