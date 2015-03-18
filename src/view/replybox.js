var React = require("react/addons");
var ChattyActions = require("../store/chattyactions.js");
var ChattyStore = require("../store/chattystore.js");
var styles = require("./styles.js");

var replyBox = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  propTypes: { 
    parentCommentId: React.PropTypes.number.isRequired
  },
  componentDidMount: function() {
    var textNode = React.findDOMNode(this.refs.commentBox);
    textNode.focus();
  },
  getInitialState: function() {
    return {body: ""};
  },
  render: function(){
    return <div>
      <div>
        <textarea ref="commentBox" valueLink={this.linkState('body')} 
          style={styles.commentBox} onClick={this.onTextClick}></textarea>
      </div>
      <div><input type="submit" value="Submit" onClick={this.onSubmitComment} /></div>
    </div>;
  },
  onSubmitComment: function(event) {
    event.stopPropagation();
    ChattyActions.submitComment(this.props.parentCommentId, this.state.body);
  },
  //this seems like a dumb hack
  onTextClick: function(event) {
    event.stopPropagation();
  }
});

module.exports = replyBox;