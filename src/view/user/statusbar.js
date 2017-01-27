import React from 'react';
import combine from '../../util/styleutil.js';
import ReplyBox from '../posts/replybox.js';

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

class StatusBar extends React.Component {
  static displayName = 'StatusBar';

  static propTypes = {
    username: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    connected: React.PropTypes.bool.isRequired,
    unseenReplies: React.PropTypes.array.isRequired,
    //showHomeLink: React.PropTypes.bool.isRequired,
    showNewThreadBox: React.PropTypes.bool.isRequired,
    unseenNewsPosts: React.PropTypes.array.isRequired
  };

  componentDidMount() {
    this.checkPMs();
    this.messageTimer = setInterval(this.checkPMs, 5 * 60 * 1000);
  }

  onCancelNewThreadClick = () => {
    this.props.chattyActions.cancelNewThread();
  };

  onMenuClick = () => {
    this.props.chattyActions.toggleMenu();
  };

  onNewThreadClick = () => {
    this.props.chattyActions.showNewThread();
  };

  onReorderClick = () => {
    this.props.chattyActions.reorderThreads();
  };

  onShowNewsClick = () => {
    this.props.chattyActions.showNewsPosts(this.props.unseenNewsPosts);
  };

  onShowRepliesClick = () => {
    this.props.chattyActions.showThreads(this.props.unseenReplies);
  };

  checkPMs = () => {
    //UserActions.requestMessageCount();
  };

  fullRefresh = () => {
    this.props.chattyActions.fullRefresh();
  };

  render() {
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
  }
}

export default StatusBar;