var React = require("react/addons");
var ChattyActions = require("../store/chattyactions.js");
var ChattyStore = require("../store/chattystore.js");
var UserActions = require("../store/useractions.js");
var UserStore = require("../store/userstore.js");
var styles = require("./styles.js");
var combine = require("../util/styleutil.js");
var LoginScreen = require("./login.js");

var statusBar = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    connected: React.PropTypes.bool.isRequired,
    lastEventId: React.PropTypes.number.isRequired,
    totalPMs: React.PropTypes.number.isRequired,
    unreadPMs: React.PropTypes.number.isRequired,
    unseenReplies: React.PropTypes.array.isRequired
  },
  showLogin: function() {
    UserActions.showLoginForm();
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
      userinfo = <span>
        <span style={styles.username}>{this.props.username}</span>&nbsp;
        <span style={styles.date}>({this.props.unreadPMs} / {this.props.totalPMs})</span>
        </span>;
    } else {
      userinfo = <span style={styles.clickable} onClick={this.showLogin}>Login</span>;
    }
    
    var loginScreen = null;
    if(this.props.showLogin) {
      loginScreen = <LoginScreen loginMessage={this.props.loginMessage}/>
    }
    
    return (<div style={styles.statusbar}>
        {status}|
        <span>Last Event ID: {this.props.lastEventId}</span>|
        {userinfo}|
        Replies: <span style={styles.clickable} onClick={this.onShowReplies}>{this.props.unseenReplies.length}</span>
        {loginScreen}
        
      </div>);
  },
  onShowReplies: function() {
    ChattyActions.showThreads(this.props.unseenReplies);
    UserActions.clearReplies();
  }
});

module.exports = statusBar;