var React = require("react/addons");
var styles = require("../misc/styles.js");
var combine = require("../../util/styleutil.js");
var renderChildComments = require("./childcomment.js").renderChildComments;
var ChattyActions = require("../../store/chattyactions.js");
var AutoscrollingMixin = require("../misc/autoscrollingmixin.js");
var ReplyBox = require("./replybox.js");
var _ = require("lodash");


module.exports = React.createClass({
    propTypes: {
      id: React.PropTypes.number.isRequired,
      replyingTo: React.PropTypes.number.isRequired,
      username: React.PropTypes.string.isRequired,
      hidden: React.PropTypes.bool.isRequired,
      latestReply: React.PropTypes.string.isRequired,
      category: React.PropTypes.string.isRequired
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
            
          replies = <div><span style={styles.clickable} 
            onClick={this.onCollapseClick}>Collapse</span></div>;
        } else {
          var highlightClass = '';
          if(this.state.highlightReplies) {
            highlightClass = 'highlight';
          }
          var replyStr = props.replyCount > 1 ? "replies" : "reply";
          replies = <div ref="replies" className={highlightClass}><span style={styles.clickable} 
              onClick={this.onRepliesClick}>
              {props.replyCount} {replyStr}</span>
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

      if(props.replyingTo == props.id) {
        replyBox = <ReplyBox parentCommentId={props.id}/>
      }
      
      var categoryStyle=null;
      if(props.category === "nws") {
        categoryStyle = styles.parentNWS;
      } else if(props.category === "informative") {
        categoryStyle = styles.parentInformative;
      }
      
      return (
        <div style={styles.parentContainer} onClick={this.onParentClick}>
          <div style={styles.parentComment}>
          {scroller}
            <div ref="anchor" style={combine(props.focused && styles.highlightedParent)}>
              <span style={styles.username}>
                {props.author}
              </span>
              @ <span style={styles.date}>{props.dateStr}</span>
              &nbsp;<span style={categoryStyle}>{props.category}</span>
              <div dangerouslySetInnerHTML={{__html: props.body}} />
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
      ChattyActions.highlightParent(this.props.id);
    }
});