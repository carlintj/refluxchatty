var React = require("react");
var ChattyActions = require("../store/chattyactions.js");
var ChattyStore = require("../store/chattystore.js");
var styles = require("./styles.js");
var combine = require("../util/styleutil.js");

var statusBar = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    connected: React.PropTypes.bool.isRequired,
    lastEventId: React.PropTypes.number.isRequired,
  },
  showLogin: function() {
    alert("todo");
  },
  fullRefresh: function() {
    ChattyActions.fullRefresh();
  },
  render: function() {
    var status = null;
    if(this.props.connected) {
      status = <span style={styles.success}>Connected</span>;
    } else {
      status = <span style={combine(styles.error, styles.clickable)}
          onClick={this.fullRefresh}>Not connected
        </span>;
    }
    var userinfo = null;
    if(this.props.username && this.props.username != "") {
      userinfo = <span style={styles.username}>{this.props.username}</span>;
    } else {
      userinfo = <span style={styles.clickable} onClick={this.showLogin}>Login</span>;
    }
    
    return (<div style={styles.statusbar}>
        {status}|
        <span>Last Event ID: {this.props.lastEventId}</span>|
        {userinfo}
      </div>);
  }
});

module.exports = statusBar;