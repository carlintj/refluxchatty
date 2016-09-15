var React = require('react');
//var UserActions = require('../../store/useractions.js');
var combine = require('../../util/styleutil.js');
//var Router = require('react-router');
//var { IndexLink } = Router;
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
    fontSize: '0.8em',
    width: '100%',
    height: '16pt',
  },
  menubuttons: {
    float: 'right',
    //paddingRight: '5px',
    cursor: 'pointer',
    height: '100%',
  },
  menubutton: {
    paddingLeft: '10px',
    paddingRight: '10px',
    height: '100%',
  },
  replyBoxContainer: {
    margin: '15px',
    marginTop: '30px',
  },
  closeButton: {
    float: 'right',
  }
};

let StatusBar = React.createClass({
  displayName: 'StatusBar',
  propTypes: {
    username: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    connected: React.PropTypes.bool.isRequired,
    unseenReplies: React.PropTypes.array.isRequired,
    //showHomeLink: React.PropTypes.bool.isRequired,
    showNewThreadBox: React.PropTypes.bool.isRequired,
    unseenNewsPosts: React.PropTypes.array.isRequired
  },
  fullRefresh: function () {
    this.props.chattyActions.fullRefresh();
  },
  onReorderClick: function () {
    this.props.chattyActions.reorderThreads();
  },
  checkPMs: function () {
    //UserActions.requestMessageCount();
  },
  componentDidMount: function () {
    this.checkPMs();
    this.messageTimer = setInterval(this.checkPMs, 5 * 60 * 1000);
  },
  onMenuClick: function () {
    this.props.chattyActions.toggleMenu();
  },
  onShowNewsClick: function() {
    this.props.chattyActions.showNewsPosts(this.props.unseenNewsPosts);
  },
  onNewThreadClick: function () {
    this.props.chattyActions.showNewThread();
  },
  onCancelNewThreadClick: function () {
    this.props.chattyActions.cancelNewThread();
  },
  onShowRepliesClick: function() {
    this.props.chattyActions.showThreads(this.props.unseenReplies);
  },
  render: function () {
    var homeLink, status, replyBox = null;
    var props = this.props;
    if (props.showHomeLink) {
      //homeLink = <IndexLink  to="/">Back to Chatty</IndexLink>;
    }

    if (props.connected) {
      status = <span style={styles.success}>Connected</span>;
    } else {
      status = <a onClick={this.fullRefresh}>Not connected - click to connect</a>;
    }

    if (props.showNewThreadBox == true) {
      replyBox = <div style={styles.replyBoxContainer}>
        <div><strong>New Thread</strong>
          <span style={combine(styles.clickable, styles.closeButton) } onClick={this.onCancelNewThreadClick}>Close</span>
        </div>
        <ReplyBox parentCommentId={0} username={props.username} 
          password={props.password} chattyActions={props.chattyActions}/>
      </div>;
    }

    let newPostsBadge = props.unseenNewsPosts.length > 0 ? props.unseenNewsPosts.length : null; 
    let newsPosts = <span data-badge={newPostsBadge} className="badge1" onClick={this.onShowNewsClick}>
                      <img src="icons/folded-newspaper.svg" style={styles.menubutton} />
                    </span>;
    
    let repliesBadge = props.unseenReplies.length > 0 ? props.unseenReplies.length : null;
    let replies = <span data-badge={repliesBadge} className="badge1" onClick={this.onShowRepliesClick}>
                      <img src="icons/envelope.svg" style={styles.menubutton} />
                    </span>;

    return (
      <div style={styles.parent}>
        <div style={styles.statusbar}>
          {homeLink} {status}
          <div style={styles.menubuttons}>
            {newsPosts}
            {replies}
            <img src="icons/pencil.svg" style={styles.menubutton} onClick={this.onNewThreadClick} />
            <img src="icons/sort-amount-desc.svg" style={styles.menubutton} onClick={this.onReorderClick} />
            <img src="icons/menu.svg" style={styles.menubutton} onClick={this.onMenuClick} />
          </div>
        </div>
        {replyBox}
      </div>);
  },
});

export default StatusBar;