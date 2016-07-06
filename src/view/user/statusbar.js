var React = require('react');
var UserActions = require('../../store/useractions.js');
var combine = require('../../util/styleutil.js');
var Router = require('react-router');
var { IndexLink } = Router;
var ReplyBox = require('../posts/replybox.js');

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
    fontSize: '0.8em',
    width: '100%',
    height: '16pt',
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
    unseenReplies: React.PropTypes.array.isRequired,
    showHomeLink: React.PropTypes.bool.isRequired,
    showNewThreadBox: React.PropTypes.bool.isRequired,
  },
  fullRefresh: function() {
    this.props.fullRefresh();
  },
  onReorderClick: function() {
    this.props.reorderThreads();
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
    this.props.showNewThread();
  },
  onCancelNewThreadClick: function() {
    this.props.cancelNewThread();
  },
  render: function() {
    var homeLink,status,replyBox = null;
    var props = this.props;
    if(this.props.showHomeLink) {
      homeLink = <IndexLink  to="/">Back to Chatty</IndexLink>;
    }
    
    if(props.connected) {
      status = <span style={styles.success}>Connected</span>;
    } else {
      status = <a onClick={this.fullRefresh}>Not connected - click to connect
        </a>;
    }

    if(props.showNewThreadBox == true) {
      replyBox = <div style={styles.replyBoxContainer}>
        <div><strong>New Thread</strong>
          <span style={combine(styles.clickable,styles.closeButton)} onClick={this.onCancelNewThreadClick}>Close</span>
        </div>
          <ReplyBox parentCommentId={0}/>
      </div>;
    }
    var notifications = props.unseenReplies.length;
    
    if(notifications === 0) {
      notifications = null;
    }
    
    return (
      <div style={styles.parent}>
        <div style={styles.statusbar}>
          {homeLink} {status}
          <div style={styles.menubuttons}>
            <img 
              src="build/icons/sort-amount-desc.svg" 
              style={styles.menubutton} 
              onClick={this.onReorderClick} 
            />
            <img 
              src="build/icons/pencil.svg" 
              style={styles.menubutton} 
              onClick={this.onNewThreadClick} 
            />
            <span data-badge={notifications} className="badge1"
              onClick={this.onMenuClick} 
              >
              <img 
                src="build/icons/menu.svg" 
                style={styles.menubutton} 
                
              />
            </span>
          </div>
        </div>
        {replyBox}
      </div>);
  },
});