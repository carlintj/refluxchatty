var React = require("react/addons");
var styles = require("../misc/styles.js");
var styleutil = require("../../util/styleutil.js");
var ChattyActions = require("../../store/chattyactions.js");

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
  render: function() {
    var props = this.props;
    var comment = props.body.replace(/<br \/>/g, " ");
    if (getVisibleLength(this.props.body) > 200) {
      comment = comment.substring(0, 200);
      comment = fixComment(comment + "...");
    }

    var ageStyle = calculateAgeStyle(props.date);
    var commentStyle = styleutil(
      ageStyle,
      props.username == props.author && styles.ownerPost,
      styles.commentContainer
    );
    if(props.category === "informative") {
      commentStyle = styleutil(commentStyle,styles.commentInformative);
    } else if(props.category === "nws") {
      commentStyle = styleutil(commentStyle,styles.commentNWS);
    }

    return (<div style={commentStyle} onClick={this.handleClick}>
        <span style={styles.username}>{props.author}</span>
        &nbsp; - &nbsp;
        <span dangerouslySetInnerHTML={{__html: comment}} ></span>
        {props.children}
      </div>
    );
  },
  handleClick: function(e) {
    this.props.onClickEvent(e);
  }
});