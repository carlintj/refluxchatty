var React = require('react');
var LoginScreen = require('./login.js');
var SearchBox = require('../posts/searchbox.js');

var styles = {
  openedMenu: {
    position: 'fixed',
    right: 0,
    overflowY: 'auto',
    paddingTop: 50,
    background: '#F6F9FA',
    marginTop: '26px',
    height: '100%',
    width: '200px',
    borderLeft: 'solid 2px #6F6F70',
    fontSize: '1em',
  },
  clickable: {
    cursor: 'pointer',
    color: '#004FFF'
  },
};

var StatusMenu = React.createClass({
  showLogin: function() {
    this.props.chattyActions.showLoginForm();
  },
  onDumpState: function() {
    this.props.chattyActions.dumpState();
  },
  render: function() {
    var loginScreen = null;
    if(this.props.showLogin) {
      loginScreen = <LoginScreen loginMessage={this.props.loginMessage}
      chattyActions = {this.props.chattyActions}
      />;
    }
    
    var userinfo;
    if(this.props.username && this.props.username != '') {
      userinfo = <span>Logged in as {this.props.username}</span>;
    }
    else if(!this.props.showLogin){
      userinfo = <a href="#" onClick={this.showLogin}>Login</a>;  
    }
   
    var searchBox = null;
    if(this.props.showSearch) {
      searchBox = <SearchBox />;
    }
    
    if(!this.props.isMenuOpened) return null;
    return (<div style={styles.openedMenu}>
      <div>Last Event ID: {this.props.lastEventId}</div> 
      {loginScreen}
      {userinfo}
      {searchBox}
      <div><a style={styles.clickable} onClick={this.onDumpState}>Dump State</a></div>
    </div>);
    }
});

module.exports = StatusMenu;