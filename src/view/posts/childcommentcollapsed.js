var React = require("react/addons");
var styleutil = require("../../util/styleutil.js");
var HoverMixin = require("..//misc/hovermixin.js");

var styles = {
  commentAge1: {
    background: '#FFA675'
  },
  commentAge2: {
    background: '#FFB186'
  },
  commentAge3: {
    background: '#FFBC97'
  },
  commentAge4: {
    background: '#FFC7A8'
  },
  commentAge5: {
    background: '#FFD2BA'
  },
  commentAge6: {
    background: '#FFDDCB'
  },
  commentAge7: {
    background: '#FFE8DC'
  },
  commentAge8: {
    background: '#FFF3ED'
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
    fontSize: 11,
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
    overflow: 'hidden'
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

  if (delta < 1) {
    return styles.commentAge1;
  }
  else if (delta < 2) {
    return styles.commentAge3;
  }
  else if (delta < 5) {
    return styles.commentAge5;
  }
  else if (delta < 10) {
    return styles.commentAge6;
  }
  else if (delta < 20) {
    return styles.commentAge7;
  }
  else if (delta < 30) {
    return styles.commentAge8;
  }
  return null;
};

module.exports = React.createClass({
  mixins: [HoverMixin],
  render: function() {
    var props = this.props;
    var comment = props.body.replace(/<br \/>/g, " ");
    if (getVisibleLength(this.props.body) > 200) {
      comment = comment.substring(0, 200);
      comment = fixComment(comment + "...");
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
    else if(props.category === "informative") {
      commentStyle = styleutil(commentStyle,styles.commentInformative);
    } else if(props.category === "nws") {
      commentStyle = styleutil(commentStyle,styles.commentNWS);
    }

    return (<div style={styles.commentContainer} onClick={this.handleClick}>
    <div style={commentStyle} ref="hover">
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