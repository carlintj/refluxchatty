var Reflux = require('reflux');
var reqwest = require('reqwest');

var URLs = {
  login: '//winchatty.com/v2/verifyCredentials',
  getMessageCount: '//winchatty.com/v2/getMessageCount',
  submitComment: '//winchatty.com/v2/postComment'
};

var Actions = Reflux.createActions({
  //Data events
  login: {
    asyncResult: true
  },
  checkPMs: {
    asyncResult: true
  },
  getMessageCount: {
    asyncResult: true
  },
  submitComment: {
    asyncResult: true
  },
  //UI events
  requestMessageCount: {
    asyncResult: false
  },
  showLoginForm: {
    asyncResult: false
  },
  logout: {
    asyncResult: false
  },
  requestSubmitComment: {
    asyncResult: false
  },
  newReplyNotification: {
    asyncResult: false
  },
  clearReplies: {
    asyncResult: false
  },
  openMenu: {
    asyncResult: false
  },
  toggleMenu: {
    asyncResult: false
  },
});

Actions.getMessageCount.listen(function(username, password) {
  reqwest({
      url: URLs.getMessageCount,
      method: 'post',
      crossOrigin: true,
      data: {
        username: username,
        password: password
      }
    })
    .then(Actions.getMessageCount.completed)
    .catch(Actions.getMessageCount.failed);
});

Actions.login.listen(function(username, password) {
  reqwest({
      url: URLs.login,
      method: 'post',
      crossOrigin: true,
      data: {
        username: username,
        password: password
      }
    })
    .then(Actions.login.completed)
    .catch(Actions.login.failed);
});

Actions.submitComment.listen(function(parentCommentId, body,
  username, password) {
  reqwest({
      url: URLs.submitComment,
      method: 'post',
      crossOrigin: true,
      data: {
        parentId: parentCommentId,
        username: username,
        password: password,
        text: body
      }
    })
    .then(Actions.submitComment.completed)
    .catch(Actions.submitComment.failed);
});

module.exports = Actions;