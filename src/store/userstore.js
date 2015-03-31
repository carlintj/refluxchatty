var Reflux = require('reflux');
var UserActions = require("./useractions.js");
var localStorage = require('store');

//actions which require u/p must originate from here to limit the number of
//places that touch the password store.  This is why some of the flows are
//a little awkward where it goes ChattyStore -> requestPost -> post

module.exports = Reflux.createStore({
  listenables: [UserActions],
  init: function() {
    this.tempusername = "";
    this.temppassword = "";

    this.pms = [];
    this.unseenReplies = [];
    this.totalPMs = 0;
    this.unreadPMs = 0;
    this.showLogin = false;
    this.loginMessage = localStorage.get('username') || "";
    
    this.sendData();
  },
  getInitialState: function() {
    return {
      username: localStorage.get('username') || "",
      pms: [],
      showLogin: false,
      totalPMs: 0,
      unreadPMs: 0,
      unseenReplies: []
    };
  },
  login: function(username, password) {
    this.tempusername = username;
    this.temppassword = password;
  },
  loginCompleted: function(data) {
    if (data.isValid) {
      this.showLogin = false;
      localStorage.set('username', this.tempusername);
      localStorage.set('password', this.temppassword);

      this.tempusername = "";
      this.temppassword = "";
      this.loginMessage = "";

      UserActions.requestMessageCount();
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
    if (!data.error) {
      this.totalPMs = data.total;
      this.unreadPMs = data.unread;
      this.sendData();
    }
  },
  getMessageCountFailed: function(error) {

  },
  submitCommentCompleted: function(data) {
    console.log("post response", data);
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
    UserActions.getMessageCount(localStorage.get('username'), localStorage.get('password'));
  },
  sendData: function() {
    this.trigger({
      showLogin: this.showLogin,
      loginMessage: this.loginMessage,
      username: localStorage.get('username'),
      totalPMs: this.totalPMs,
      unreadPMs: this.unreadPMs,
      unseenReplies: this.unseenReplies
    });
  },
  requestSubmitComment: function(parentCommentId, body) {
    UserActions.submitComment(parentCommentId, body,
      localStorage.get('username'), localStorage.get('password'));
  },
  newReplyNotification: function(threadId, commentId) {
    this.unseenReplies.push({threadId: threadId, commentId: commentId});
    this.sendData();
  },
  clearReplies: function() {
    this.unseenReplies = [];
    this.sendData();
  }
});