var Reflux = require('reflux');
var reqwest = require("reqwest");

var URLs = {
    login: "//winchatty.com/v2/verifyCredentials",
    getMessageCount: "//winchatty.com/v2/getMessageCount"
};

var Actions = Reflux.createActions({
    //Data events
    login: {asyncResult: true},
    checkPMs: {asyncResult: true},
    getMessageCount: {asyncResult: true},
    //UI events
    requestMessageCount: {asyncResult: false},
    showLoginForm: {asyncResult : false},
    logout: {asyncResult: false}
});

Actions.getMessageCount.listen(function(username,password){
  reqwest({ url: URLs.getMessageCount,
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

Actions.login.listen(function(username,password) {
  reqwest({ url: URLs.login,
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

module.exports = Actions;