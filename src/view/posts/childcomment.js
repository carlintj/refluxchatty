import React from 'react';
import ChildCommentCollapsed from './childcommentcollapsed.js';
import ChildCommentExpanded from './childcommentexpanded.js';
import _ from 'lodash';

var renderChildComments = function (threadId, children, expandedChildId, replyingTo, 
username, password, chattyActions) {
  return _.map(children, (comment) => {
    return (<ChildComment key={comment.id}
      id = {comment.id}
      author={comment.author}
      body={comment.body}
      children = {comment.children}
      date = {comment.date}
      dateStr = {comment.dateStr}
      expandedChildId = {expandedChildId}
      threadId={threadId}
      replyingTo={replyingTo}
      category={comment.category}
      username={username}
      password={password}
      chattyActions={chattyActions}
      />);
  });
};

class ChildComment extends React.Component {
  static propTypes = {
    date: React.PropTypes.object.isRequired, //date isn't a proptype
    threadId: React.PropTypes.number.isRequired,
    children: React.PropTypes.array.isRequired,
    expandedChildId: React.PropTypes.number.isRequired,
    replyingTo: React.PropTypes.number.isRequired,
    body: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    username: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    chattyActions: React.PropTypes.object.isRequired
  };

  handleClick = (e) => {
    e.stopPropagation();
    //ChattyActions.selectComment(this.props.threadId,this.props.id);
    let {chattyActions, threadId, id} = this.props;
    chattyActions.selectComment(threadId, id);
  };

  render() {
    var props = this.props;
    var replies = renderChildComments(props.threadId, props.children,
      props.expandedChildId, props.replyingTo, props.username,props.password, props.chattyActions);
    var expanded = props.expandedChildId == props.id;

    if (!expanded) {
      return (
        <ChildCommentCollapsed body={props.body} author={props.author}
          date={props.date}
          onClickEvent={this.handleClick}
          username={props.username}
          category={props.category}>
          {replies}
        </ChildCommentCollapsed>
      );
    } else {
      return (
        <ChildCommentExpanded
          body={props.body} author={props.author} dateStr={props.dateStr}
          id={props.id}
          threadId={props.threadId}
          replyingTo={props.replyingTo}
          category={props.category}
          chattyActions={props.chattyActions}
          username={props.username}
          password={props.password}
          >
          
          {replies}
        </ChildCommentExpanded>
      );
    }
  }
}

module.exports = { ChildComment: ChildComment, renderChildComments: renderChildComments };