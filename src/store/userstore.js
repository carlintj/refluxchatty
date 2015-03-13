var Reflux = require('reflux');
var UserActions = require("./useractions.js");
var localStorage = require('store');

var UserStore = Reflux.createStore({
  listenables: [UserActions],
  init: function() {
    this.tempusername = "";
    this.temppassword = "";

    this.pms = [];
    this.totalPMs = 0;
    this.unreadPMs = 0;
    this.showLogin = false;
    this.loginMessage = localStorage.get('username') || "";
  },
  getInitialState: function() {
    return {
      username: localStorage.get('username') || "",
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
      localStorage.set('username',this.tempusername);
      localStorage.set('password', this.temppassword);

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
    if(!data.error) {
      this.totalPMs = data.total;
      this.unreadPMs = data.unread;
      this.sendData();  
    }
  },
  getMessageCountFailed: function(error) {
    
  },
  showLoginForm: function() {
    this.showLogin = true;
    this.sendData();
  },
  logout: function() {
    localStorage.clear();
    this.sendData();
  },
  requestMessageCount: function() { 
    UserActions.getMessageCount(localStorage.get('username'),localStorage.get('password'));
  },
  sendData: function() {
    this.trigger({
     showLogin : this.showLogin,
     loginMessage: this.loginMessage,
     username: localStorage.get('username'),
     password: localStorage.get('password'),
     totalPMs: this.totalPMs,
     unreadPMs: this.unreadPMs
    });
  }
});

module.exports = UserStore;