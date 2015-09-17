var _ = require("lodash");
var React = require("react/addons");

var styles = {
  clickable: {
    cursor: 'pointer',
    color: '#004FFF'
  },
  date: {
    fontSize: '0.8em',
  },
};

var ParentReplyLink = React.createClass({
  propTypes: {
    expanded: React.PropTypes.bool.isRequired,
    replyCount: React.PropTypes.number.isRequired,
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
  render: function() {
    var props = this.props;
    
    if (props.replyCount > 0) {
        if(props.expanded) {
          return (<div><a style={styles.clickable} 
            onClick={props.onCollapseClick}>Collapse</a></div>);
        } else {
          var highlightClass = '';
          if(props.highlightReplies) {
            highlightClass = 'highlight';
          }
          var replyStr = props.replyCount > 1 ? "replies" : "reply";
          return (<div ref="replies" className={highlightClass}><a style={styles.clickable} 
              onClick={props.onRepliesClick}>
              {props.replyCount} {replyStr}</a>
              &nbsp;<span style={styles.date}>Last reply @ {props.latestReply}</span>
            </div>);
          }
      } else {
        return <span>No replies</span>;
      }
  }
});

module.exports = ParentReplyLink;
