var React = require("react/addons");
var combine = require("../../util/styleutil.js");
var renderChildComments = require("./childcomment.js").renderChildComments;
var ChattyActions = require("../../store/chattyactions.js");
var AutoscrollingMixin = require("../misc/autoscrollingmixin.js");
var ReplyBox = require("./replybox.js");
var ReplyButton = require("./replybutton.js");
var _ = require("lodash");
var PostBody = require("./postbody.js");

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
    background: '#E0F3FF',
    border: '1px solid #cddaf3',
  },
  parentInformative: {
    fontWeight: 'bold',
    color: '#0000FF'
  },
  parentNWS: {
    fontWeight: 'bold',
    color: '#FF0000'
  },
  parentContainer: {
    background: '#FFFFFF',
    margin: '5px',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
  },
  parentComment: {
    padding: '5px',
    fontFamily: 'Helvetica,Arial,sans-serif',
    fontSize: '0.8em',
  },
  searchMatch: {
    background: '#FF00FF'
  },
};

var ParentComment = React.createClass({
    propTypes: {
      id: React.PropTypes.number.isRequired,
      replyingTo: React.PropTypes.number.isRequired,
      username: React.PropTypes.string.isRequired,
      hidden: React.PropTypes.bool.isRequired,
      latestReply: React.PropTypes.string.isRequired,
      category: React.PropTypes.string.isRequired,
      searchMatch: React.PropTypes.bool.isRequired
    },
    getInitialState: function() {
      return ({'highlightReplies': false});
    },
    shouldComponentUpdate: function(nextProps, nextState) {
      if(this.props.replyingTo != nextProps.replyingTo) return true;
      if(this.props.hidden != nextProps.hidden) return true;
      if(this.props.replyCount != nextProps.replyCount) return true;
      if(this.props.expandedChildId != nextProps.expandedChildId) return true;
      if(this.props.focused != nextProps.focused) return true;
      if(this.props.expanded != nextProps.expanded) return true;
      if(this.props.visibleThreads.length != nextProps.visibleThreads.length) return true;
      if(this.props.searchMatch != nextProps.searchMatch) return true;
      return false;
    },
    render: function() {
      if(this.props.hidden) return null;
      var props = this.props;
      if(props.visibleThreads.length > 0 &&
        !_.find(props.visibleThreads, {threadId: props.id})) {
        return null;
      }
      
      var replyPosts = null;
      var replies = null;
      var replyBox = null;
      var scroller = null;
      
      if (props.replyCount > 0) {
        if(props.expanded) {
          replyPosts = renderChildComments(props.threadId,props.children, 
              props.expandedChildId,props.replyingTo,props.username);
          replies = <div><a style={styles.clickable} 
            onClick={this.onCollapseClick}>Collapse</a></div>;
        } else {
          var highlightClass = '';
          if(this.state.highlightReplies) {
            highlightClass = 'highlight';
          }
          var replyStr = props.replyCount > 1 ? "replies" : "reply";
          replies = <div ref="replies" className={highlightClass}><a style={styles.clickable} 
              onClick={this.onRepliesClick}>
              {props.replyCount} {replyStr}</a>
              &nbsp;<span style={styles.date}>Last reply @ {props.latestReply}</span>
            </div>;
          }
      } else {
        replies = <span>No replies</span>;
      }

      if(props.focused && (props.id === props.expandedChildId || !props.expanded )) {
        scroller = <AutoscrollingMixin parent={this} />
      } else {
        scroller = null;
      }

      if(props.replyingTo === props.id) {
        replyBox = <ReplyBox parentCommentId={props.id}/>
      }
      
      var categoryStyle=null;
      if(props.category === "nws") {
        categoryStyle = styles.parentNWS;
      } else if(props.category === "informative") {
        categoryStyle = styles.parentInformative;
      }
      
      return (
        <div style={styles.parentContainer}>
          <div style={combine(styles.parentComment, props.searchMatch && styles.searchMatch) }>
          {scroller}
            <div ref="anchor" 
              style={combine(props.focused && styles.highlightedParent)}
              onClick={this.onParentClick}
            >
              <span style={styles.username}>
                {props.author}
              </span>
              @ <span style={styles.date}>{props.dateStr}</span>
              &nbsp;<span style={categoryStyle}>{props.category}</span>
              <ReplyButton threadId = {props.threadId} commentId = {props.id} />
              <PostBody body={props.body} />
              {replies}
            </div>
            {replyBox}
            {replyPosts}
          </div>
        </div>
      );
    },
    componentWillReceiveProps: function(nextProps) {
      if(nextProps.replyCount != this.props.replyCount) {
        this.setState({'highlightReplies': true});
      } else {
        this.setState({'highlightReplies': false});
      }
    },
    componentDidUpdate: function() {
      var repliesDiv = this.refs.replies;
      if(repliesDiv) {
        var el = React.findDOMNode(repliesDiv);
        if(el.classList.contains('highlight')) {
          setTimeout(function() {
            el.classList.remove('highlight');
          },10000);  
        }
      }
    },
    onRepliesClick: function() {
      ChattyActions.toggleParentComment(this.props.id);
    },
    onCollapseClick: function() {
      ChattyActions.toggleParentComment(this.props.id);
    },
    onParentClick: function() {
      if(this.expandedChildId !== 0) ChattyActions.highlightParent(this.props.id);
    }
});

module.exports = ParentComment;