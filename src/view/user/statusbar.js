var React = require("react/addons");
var ChattyActions = require("../../store/chattyactions.js");
var UserActions = require("../../store/useractions.js");
var combine = require("../../util/styleutil.js");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var ReplyBox = require("../posts/replybox.js");

var styles = {
  parent: {
    overflow: 'auto',
  },
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
    height: '5%',
  },
  menubuttons: {
    float: 'right',
    //paddingRight: '5px',
    cursor: 'pointer',
    height:'100%',
  },
  menubutton: {
    paddingLeft: '10px',
    paddingRight: '10px',
    height:'100%',
  },
  replyBoxContainer: {
    margin: '15px',
    marginTop: '30px',
  },
  closeButton: {
    float: 'right',
  }
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
    showHomeLink: React.PropTypes.bool.isRequired,
    showNewThreadBox: React.PropTypes.bool.isRequired,
  },
  fullRefresh: function() {
    ChattyActions.fullRefresh();
  },
  onReorderClick: function() {
    ChattyActions.reorderThreads();
  },
  checkPMs: function() {
    UserActions.requestMessageCount();
  },
  componentDidMount: function() {
    this.checkPMs();
    this.messageTimer = setInterval(this.checkPMs,5 * 60 * 1000);
  },
  onMenuClick: function() {
    UserActions.toggleMenu();
  },
  onNewThreadClick: function() {
    ChattyActions.showNewThread();
  },
  onCancelNewThreadClick: function() {
    ChattyActions.cancelNewThread();
  },
  render: function() {
    var homeLink = null;
    var props = this.props;
    if(this.props.showHomeLink) {
      homeLink = <Link to="ChattyHome">Back to Chatty</Link>;
    }
    
    var status = null;
    if(props.connected) {
      status = <span style={styles.success}>Connected</span>;
    } else {
      status = <a onClick={this.fullRefresh}>Not connected - click to connect
        </a>;
    }
    var userinfo = null;
    if(props.username && props.username != "") {
      userinfo = <span>
          <span style={styles.date}>({props.unreadPMs} / {props.totalPMs})</span>
        </span>;
    } 
    var replyBox = null;
    if(props.showNewThreadBox == true) {
      replyBox = <div style={styles.replyBoxContainer}>
        <div><strong>New Thread</strong>
          <span style={combine(styles.clickable,styles.closeButton)} onClick={this.onCancelNewThreadClick}>Close</span>
        </div>
          <ReplyBox parentCommentId={0}/>
      </div>;
    }
    
    return (
      <div style={styles.parent}>
        <div style={styles.statusbar}>
          {homeLink} {status} {userinfo}
          <div style={styles.menubuttons}>
            <img 
              src="/build/icons/sort-amount-desc.svg" 
              style={styles.menubutton} 
              onClick={this.onReorderClick} 
            />
            <img 
              src="/build/icons/pencil.svg" 
              style={styles.menubutton} 
              onClick={this.onNewThreadClick} 
            />
            <img 
              src="/build/icons/menu.svg" 
              style={styles.menubutton} 
              onClick={this.onMenuClick} 
            />
          </div>
        </div>
        {replyBox}
      </div>);
  },
});