var React = require("react/addons");
var ChattyActions = require("../../store/chattyactions.js");
var UserActions = require("../../store/useractions.js");
var styles = require("../misc/styles.js");
var combine = require("../../util/styleutil.js");
var LoginScreen = require("./login.js");
var SearchBox = require("../posts/searchbox.js");

module.exports = React.createClass({
  displayName: 'StatusBar',
  propTypes: {
    username: React.PropTypes.string.isRequired,
    connected: React.PropTypes.bool.isRequired,
    lastEventId: React.PropTypes.number.isRequired,
    totalPMs: React.PropTypes.number.isRequired,
    unreadPMs: React.PropTypes.number.isRequired,
    unseenReplies: React.PropTypes.array.isRequired,
    showSearch: React.PropTypes.bool.isRequired,
  },
  showLogin: function() {
    UserActions.showLoginForm();
  },
  fullRefresh: function() {
    ChattyActions.fullRefresh();
  },
  checkPMs: function() {
    UserActions.requestMessageCount();
  },
  componentDidMount: function() {
    this.checkPMs();
    this.messageTimer = setInterval(this.checkPMs,5 * 60 * 1000);
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
      loginScreen = <LoginScreen loginMessage={this.props.loginMessage}/>;
    }
    
    var searchBox = null;
      if(this.props.showSearch) {
        searchBox = <SearchBox />;
      }
    
    return (<div style={styles.statusbar}>
        {status} 
        &nbsp;|&nbsp;
        <span>Last Event ID: {this.props.lastEventId}</span> 
        &nbsp;|&nbsp;
        {userinfo} 
        &nbsp;|&nbsp;
        Replies: <span style={styles.clickable} onClick={this.onShowReplies}>{this.props.unseenReplies.length}</span>
        &nbsp;|&nbsp;
        <span style={styles.clickable} onClick={this.onReorderClick}>Reorder</span>
        {loginScreen}
        {searchBox}
      </div>);
  },
  onShowReplies: function() {
    ChattyActions.showThreads(this.props.unseenReplies);
    UserActions.clearReplies();
  },
  onReorderClick: function() {
    ChattyActions.reorderThreads();
  }
});