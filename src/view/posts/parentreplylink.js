var React = require('react');
var ReactDOM = require('react-dom');


let styles = {
  clickable: {
    cursor: 'pointer',
    color: '#004FFF'
  },
  date: {
    fontSize: '0.8em',
  },
};

let ParentReplyLink = React.createClass({
  propTypes: {
    expanded: React.PropTypes.bool.isRequired,
    replyCount: React.PropTypes.number.isRequired,
  },
  getInitialState: function () {
    return ({
      seenReplies: 0
    });
  },
  componentDidUpdate: function () {
    let repliesDiv = this.refs.replies;
    if (repliesDiv) {
      let el = ReactDOM.findDOMNode(repliesDiv);
      if (el.classList.contains('highlight')) {
        setTimeout(function () {
          el.classList.remove('highlight');
        }, 10000);
      }
    }
  },
  componentWillMount: function () {
    this.setState({ seenReplies: this.props.replyCount });
  },
  onRepliesClick: function () {
    this.setState({ seenReplies: this.props.replyCount });
    this.props.onRepliesClick();
  },
  onCollapseClick: function () {
    this.setState({ seenReplies: this.props.replyCount });
    this.props.onCollapseClick();
  },
  render: function () {
    let {replyCount, expanded, highlightReplies, latestReply} = this.props;
    if (replyCount > 0) {
      if (expanded) {
        return (<div><a style={styles.clickable}
          onClick={this.onCollapseClick}>Collapse</a></div>);
      } else {
        let highlightClass = '';
        if (highlightReplies) {
          highlightClass = 'highlight';
        }
        let replyStr = replyCount > 1 ? 'replies' : 'reply';
        let replies = replyCount;
        if (replyCount - this.state.seenReplies != 0 && this.state.seenReplies > 0) {
          let newCount = replyCount - this.state.seenReplies;
          replies += ' (' + newCount + ' new)';
        }
        return (<div ref="replies" className={highlightClass}><a style={styles.clickable}
          onClick={this.onRepliesClick}>
          {replies} {replyStr}</a>
          &nbsp; <span style={styles.date}>Last reply @{latestReply}</span>
        </div>);
      }
    } else {
      return <span>No replies</span>;
    }
  }
});

module.exports = ParentReplyLink;
