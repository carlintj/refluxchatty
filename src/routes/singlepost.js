import React from 'react';
import ParentComment from '../view/posts/parentcomment.js';

var styles = {
  commentBody : {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'Helvetica,Arial,sans-serif',
  },
};

var SinglePost =  React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      threadId: null,
      postId: null,
      focused : false
    };
  },
  componentWillReceiveProps: function() {
    var threadId = this.props.routeParams.threadId;
    //var postId = router.getCurrentQuery().postId;
    if(this.state.threadId != threadId) {
      this.setState({
        threadId: Number(threadId),
        postId: Number(0),
        focused: false,
      });
      this.props.loadPostIfNotFound(threadId);
    } else if(!this.state.focused) {
        var t = this.props.ChattyStore.findThreadByPostId(threadId);
        if (t) {
          this.props.selectComment(t.id,this.state.postId);
          this.setState({focused: true});
        }
      }
  },
  render: function () {
    if(!this.state.threadId) return null;
    
    var comment = this.props.ChattyStore.findThreadByPostId(this.state.threadId);
    if(!comment) { 
      return null;
    }

    
    return <div style={styles.commentBody}>
      <ParentComment key={comment.id}
        id={comment.id}
        author={comment.author} 
        body={comment.body} 
        children = {comment.children}
        replyCount = {comment.replyCount}
        date = {comment.date}
        dateStr = {comment.dateStr}
        expanded = {true}
        expandedChildId = {comment.expandedChildId}
        threadId={comment.id}
        focused={comment.focused}
        hidden={false}
        latestReply={comment.latestReplyStr}
        replyingTo={this.props.ChattyStore.replyingTo}
        visibleThreads={[]}
        username={this.props.UserStore.username}
        category={comment.category}
        searchMatch={comment.searchMatch}
        />

    </div>;
  }
});

module.exports = SinglePost;