var Reflux = require('reflux');
var UserActions = require("./useractions.js");

var UserStore = Reflux.createStore({
  listenables: [UserActions],
  init: function() {
    this.tempusername = "";
    this.temppassword = "";
    
    this.username = "";
    this.password = "";
    
    this.pms = [];
    this.totalPMs = 0;
    this.unreadPMs = 0;
    this.showLogin = false;
    this.loginMessage = "";
  },
  getInitialState: function() {
    return {
      username: "",
      pms: [],
      showLogin: false,
      totalPMs : 0,
      unreadPMs: 0
    };
  },
  login: function(username,password) {
    this.tempusername = username;
    this.temppassword = password;
  },
  loginCompleted: function(data) {
    if(data.isValid) {
      this.showLogin = false;
      this.username = this.tempusername;
      this.password = this.temppassword;
      
      this.tempusername = "";
      this.temppassword = "";
      this.loginMessage = "";
      
      UserActions.getMessageCount(this.username,this.password);
    } else {
      this.loginMessage = "Error logging in.  Check your username and password dummy";
    }

    this.sendData();
  },
  loginFailed: function(error) {
    this.loginMessage = error;
    this.sendData();
  },
  getMessageCountCompleted: function(data) {
    this.totalPMs = data.total;
    this.unreadPMs = data.unread;
    this.sendData();
  },
  getMessageCountFailed: function(error) {
    
  },
  showLoginForm: function() {
    this.showLogin = true;
    this.sendData();
  },
  logout: function() {
    this.username = "";
    this.sendData();
  },
  requestMessageCount: function() { 
    UserActions.getMessageCount(this.username,this.password);
  },
  sendData: function() {
    this.trigger({
     showLogin : this.showLogin,
     loginMessage: this.loginMessage,
     username: this.username,
     password: this.password,
     totalPMs: this.totalPMs,
     unreadPMs: this.unreadPMs
    });
  }
});

module.exports = UserStore;