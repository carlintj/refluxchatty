var React = require("react/addons");
var ChattyActions = require("../../store/chattyactions.js");
var UserActions = require("../../store/useractions.js");
var combine = require("../../util/styleutil.js");
var LoginScreen = require("./login.js");
var SearchBox = require("../posts/searchbox.js");

var styles = {
  success: {
    color: '#3F82C5'
  },
  error: {
    color: '#red !important'
  },
  clickable: {
    cursor: 'pointer',
    color: '#004FFF'
  },
  username: {
    color: '#3F82C5'
  },
  date: {
    fontSize: 10
  },
  statusbar: {
    background: '#FFFFFF',
    borderBottom: '2px solid #000000',
    padding: 2,
    position: 'fixed',
    fontFamily: 'Helvetica,Arial,sans-serif',
    fontSize: 13,
    width: '100%',
  },
};

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
  getInitialState: function() {
    return {showingReplies : false};
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
      status = <a style={combine(styles.error)}
          onClick={this.fullRefresh}>Not connected
        </a>;
    }
    var userinfo = null;
    if(this.props.username && this.props.username != "") {
      userinfo = <span>
        <span style={styles.username}>{this.props.username}</span>&nbsp;
        <span style={styles.date}>({this.props.unreadPMs} / {this.props.totalPMs})</span>
        </span>;
    } else {
      userinfo = <a style={styles.clickable} onClick={this.showLogin}>Login</a>;
    }
    
    var loginScreen = null;
    if(this.props.showLogin) {
      loginScreen = <LoginScreen loginMessage={this.props.loginMessage}/>;
    }
    
    var searchBox = null;
    if(this.props.showSearch) {
      searchBox = <SearchBox />;
    }
    
    var replies = null;
    if(this.state.showingReplies && this.props.unseenReplies.length == 0) {
      replies = <a style={styles.clickable} onClick={this.onShowReplies}>Show all</a>;
    } else {
       replies = <a style={styles.clickable} onClick={this.onShowReplies}>{this.props.unseenReplies.length}</a>;
    }
    
    return (<div style={styles.statusbar}>
        {status} 
        &nbsp;|&nbsp;
        <span>Last Event ID: {this.props.lastEventId}</span> 
        &nbsp;|&nbsp;
        {userinfo} 
        &nbsp;|&nbsp;
        Replies: {replies}
        &nbsp;|&nbsp;
        <a style={styles.clickable} onClick={this.onReorderClick}>Reorder</a>
        {loginScreen}
        {searchBox}
      </div>);
  },
  onShowReplies: function() {
    if(this.props.unseenReplies.length == 0) {
      this.state.showingReplies = false;
    } else {
      this.state.showingReplies = true;
    }
    
    ChattyActions.showThreads(this.props.unseenReplies);
    UserActions.clearReplies();
  },
  onReorderClick: function() {
    ChattyActions.reorderThreads();
  }
});