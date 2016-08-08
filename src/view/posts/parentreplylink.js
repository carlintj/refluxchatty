var React = require('react');
var ReactDOM = require('react-dom');


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
  getInitialState: function() {
    return ({
      seenReplies: 0
    });
  },
  componentDidUpdate: function() {
    var repliesDiv = this.refs.replies;
    if(repliesDiv) {
      var el = ReactDOM.findDOMNode(repliesDiv);
      if(el.classList.contains('highlight')) {
        setTimeout(function() {
          el.classList.remove('highlight');
        },10000);  
      }
    }
  },
  componentWillMount: function() {
    this.setState({seenReplies: this.props.replyCount});
  },
  onRepliesClick() {
    this.setState({seenReplies: this.props.replyCount});
    this.props.onRepliesClick();
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
          var replyStr = props.replyCount > 1 ? 'replies' : 'reply';
          var replies = props.replyCount;
          if(props.replyCount - this.state.seenReplies != 0 && this.state.seenReplies > 0) {
            let newCount = props.replyCount - this.state.seenReplies;
            replies += ' (' + newCount + ' new)';
          }
          return (<div ref="replies" className={highlightClass}><a style={styles.clickable} 
              onClick={this.onRepliesClick}>
              {replies} {replyStr}</a>
              &nbsp;<span style={styles.date}>Last reply @ {props.latestReply}</span>
            </div>);
          }
      } else {
        return <span>No replies</span>;
      }
  }
});

module.exports = ParentReplyLink;
