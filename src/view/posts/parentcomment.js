import React from 'react';
import combine from '../../util/styleutil.js';
import { renderChildComments } from './childcomment.js';
import AutoscrollingMixin from '../misc/autoscrollingmixin.js';
import ReplyBox from './replybox.js';
import ReplyButton from './replybutton.js';
import _ from 'lodash';
import PostBody from './postbody.js';
import ParentReplyLink from './parentreplylink.js';
import ReactDOM from 'react-dom';
import {isElementInViewport,isElementOutViewport} from '../../util/elementscrolling';
import ParentCommentBar from './parentcommentbar';


var styles = {
  clickable: {
    cursor: 'pointer',
    color: '#004FFF'
  },
  username: {
    color: '#3F82C5'
  },
  date: {
    fontSize: 10
  },
  highlightedParent: {
    background: '#FFFFFF',
    color: '#000000'
  },
  dummyBorder: {
    borderBottom: '1px solid #9E9E9D',
    paddingBottom: '2px',
  },
  parentInformative: {
    fontWeight: 'bold',
    color: '#0000FF'
  },
  parentNWS: {
    fontWeight: 'bold',
    color: '#FF0000'
  },
  parentPolitical: {
    fontWeight: 'bold',
    color: '#929B5A'
  },
  parentNuked: {
    fontWeight: 'bold',
    color: '#FF006E'
  },
  parentContainer: {
    borderColor: '#ddd',
    borderWidth: '1px',
    borderRadius: '4px 4px 4px 4px',
    background: '#F2F2F2',
    marginBottom: '3px',
    color: 'rgba(0, 0, 0, 0.5)'
  },
  searchMatch: {
    background: '#FF00FF'
  },
};

class ParentComment extends React.Component {
  static propTypes = {
    id: React.PropTypes.number.isRequired,
    replyingTo: React.PropTypes.number.isRequired,
    username: React.PropTypes.string.isRequired,
    hidden: React.PropTypes.bool.isRequired,
    latestReply: React.PropTypes.string.isRequired,
    category: React.PropTypes.string.isRequired,
    searchMatch: React.PropTypes.bool.isRequired
  };

  state = {
    'highlightReplies': false,
    'showParentBar': false
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.replyingTo != nextProps.replyingTo) return true;
    if (this.props.hidden != nextProps.hidden) return true;
    if (this.props.replyCount != nextProps.replyCount) return true;
    if (this.props.expandedChildId != nextProps.expandedChildId) return true;
    if (this.props.focused != nextProps.focused) return true;
    if (this.props.expanded != nextProps.expanded) return true;
    if (this.props.visibleThreads.length != nextProps.visibleThreads.length) return true;
    if (this.props.searchMatch != nextProps.searchMatch) return true;
    if (this.state.showParentBar != nextState.showParentBar) return true;
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.replyCount != this.props.replyCount) {
      this.setState({ 'highlightReplies': true });
    } else {
      this.setState({ 'highlightReplies': false });
    }

    //register scroll listening when focused
    if(nextProps.focused && !this.props.focused) {
      window.addEventListener('scroll', this.onScroll);
    } else if(!nextProps.focused && this.props.focused) {
      window.removeEventListener('scroll', this.onScroll);
      this.setState({'showParentBar': false});
    }
  }

  onRepliesClick = () => {
    this.props.chattyActions.toggleParentComment(this.props.id);
  };

  onCollapseClick = () => {
    this.props.chattyActions.toggleParentComment(this.props.id);
  };

  onParentClick = () => {
    if (this.expandedChildId !== 0) {
      this.props.chattyActions.highlightParent(this.props.id);
    }
  };

  onScroll = () => {
    let topElement = ReactDOM.findDOMNode(this.refs.top);
    let bodyElement = ReactDOM.findDOMNode(this.refs.parentbody);
    //show bar only if bottom is visible but top is not
    if(topElement && bodyElement) {
      let topVisible = isElementInViewport(topElement);
      let bodyVisible = !isElementOutViewport(bodyElement, {bottom: 30});
      let showParentBar = !topVisible && bodyVisible;

      this.setState({'showParentBar' : showParentBar})
    }
  };

  render() {
    if (this.props.hidden) return null;
    var props = this.props;
    if (props.visibleThreads.length > 0 && !_.find(props.visibleThreads, { threadId: props.id })) {
      return null;
    }

    var replyPosts, replies, replyBox, scroller = null;

    replies = <ParentReplyLink expanded={props.expanded || false}
      replyCount={props.replyCount}
      seenReplyCount={props.seenReplyCount}
      latestReply={props.latestReply}
      highlightReplies={this.state.highlightReplies}
      onRepliesClick={this.onRepliesClick}
      onCollapseClick={this.onCollapseClick}
      />;

    if (props.expanded) {
      replyPosts = renderChildComments(props.threadId, props.children,
        props.expandedChildId, props.replyingTo, props.username, props.password,
        props.chattyActions);
    }

    if (props.focused && (props.id === props.expandedChildId || !props.expanded)) {
      scroller = <AutoscrollingMixin parent={this} />;
    } else {
      scroller = null;
    }

    if (props.replyingTo === props.id) {
      replyBox = <ReplyBox parentCommentId={props.id}
        chattyActions={props.chattyActions}
        username={props.username}
        password={props.password}
        />;
    }

    var categoryStyle = null;
    if (props.category === 'nws') {
      categoryStyle = styles.parentNWS;
    } else if (props.category === 'informative') {
      categoryStyle = styles.parentInformative;
    } else if (props.category === 'political') {
      categoryStyle = styles.parentPolitical;
    } else if(props.category === 'nuked') {
      categoryStyle = styles.parentNuked;
    }

    let parentBar = null;
    
    if(this.state.showParentBar) {
      parentBar = <ParentCommentBar {...this.props} chattyActions={props.chattyActions} />;
    }

    return (
      <div style={combine(styles.dummyBorder, styles.parentContainer)}>
        <div ref="top" />
        <div style={combine(props.searchMatch && styles.searchMatch) } ref="parentbody">
          {scroller}
          <div 
            style={combine(props.focused && styles.highlightedParent) }
            onClick={this.onParentClick}>
            <span style={styles.username}>
              {props.author}
            </span>
             @ <span style={styles.date}>{props.dateStr}</span>
             <span style={categoryStyle}>{props.category}</span>
            <PostBody body={props.body}  ref="anchor"/>
            <div>
              <ReplyButton threadId={props.threadId} 
                commentId={props.id} 
                chattyActions={props.chattyActions} />
              </div>
            {replies}
          </div>
          {replyBox}
          {replyPosts}
          {parentBar}
        </div>
      </div>
    );
  }
}

module.exports = ParentComment;