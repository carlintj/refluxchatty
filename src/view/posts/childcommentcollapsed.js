var React = require('react');
var styleutil = require('../../util/styleutil.js');
var HoverMixin = require('..//misc/hovermixin.js');

var styles = {
  commentAge1: {
    background: '#4FC3F7',
    fontWeight: 'bold'
  },
  commentAge2: {
    background: '#81D4FA'
  },
  commentAge3: {
    background: '#B3E5FC'
  },
  commentAge4: {
    background: '#E1F5FE'
  },
  username: {
    color: '#3F82C5'
  },
  date: {
    fontSize: 10
  },
  ownerPost: {
    background: '#EFFC94'
  },
  commentContainer: {
    marginLeft: 12,
    //marginTop: 2,
    borderLeft: '1px solid #cdced0',
    //borderTop: '1px solid #cdced0',
    //borderRadius: '5px',
    //padding: '2px',
    whiteSpace: 'nowrap'
  },
  commentInformative: {
    borderLeft: '2px solid #0003FD',
  },
  commentNWS: {
    borderLeft: '2px solid #FF0000',
  },
  hoveredComment: {
    background: '#E0F3FF',
    cursor: 'pointer',
  },
  commentBody: {
    overflow: 'hidden',
    fontSize: '0.8em',
  }
};

var fixComment = function(comment) {
  var div = document.createElement('div');
  div.innerHTML = comment;
  return div.innerHTML;
};

var getVisibleLength = function(comment) {
  var div = document.createElement('div');
  div.innerHTML = comment;
  return div.textContent.length;
};

var calculateAgeStyle = function(date) {
  var now = Date.now();
  var delta = (now - date) / 60000;

  if (delta < 2) {
    return styles.commentAge1;
  }
  else if (delta < 5) {
    return styles.commentAge2;
  }
  else if (delta < 10) {
    return styles.commentAge3;
  }
  else if (delta < 20) {
    return styles.commentAge4;
  }
  return null;
};

let ChildCommentCollapsed = React.createClass({
  mixins: [HoverMixin],
  render: function() {
    var props = this.props;
    var comment = props.body.replace(/<br \/>/g, ' ');
    if (getVisibleLength(this.props.body) > 200) {
      comment = comment.substring(0, 200);
      comment = fixComment(comment + '...');
    }

    var ageStyle = calculateAgeStyle(props.date);
    var commentStyle = styleutil(
      styles.commentBody,
      ageStyle,
      props.username == props.author && styles.ownerPost
    );
    if(this.state.hovered) {
      commentStyle = styleutil(styles.hoveredComment,styles.commentBody);
    }
    else if(props.category === 'informative') {
      commentStyle = styleutil(commentStyle,styles.commentInformative);
    } else if(props.category === 'nws') {
      commentStyle = styleutil(commentStyle,styles.commentNWS);
    }

    return (<div style={styles.commentContainer}>
    <div style={commentStyle} ref="hover" onClick={this.handleClick}>
      <span style={styles.username}>{props.author}</span>
      &nbsp; - &nbsp;
      <span dangerouslySetInnerHTML={{__html: comment}} ></span>
      </div>
      {props.children}
    </div>
    );
  },
  handleClick: function(e) {
    this.props.onClickEvent(e);
  }
});

module.exports = ChildCommentCollapsed;