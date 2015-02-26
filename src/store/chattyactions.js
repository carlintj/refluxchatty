var reqwest = require("reqwest");
var _ = require("lodash");
var Reflux = require('reflux');

var URLs = {
    getChatty : "getChatty",
    getNewestEventId: "getNewestEventId",
    waitForEvent: "waitForEvent?lastEventId=",
    verifyCredentials: "verifyCredentials"
};

var BASE_URL = "//winchatty.com/v2/";
//var BASE_URL = "//refluxchatty-carlintj.c9.io/dummydata/";

var Actions = Reflux.createActions({
    //Data events
    getChatty : {asyncResult: true},
    getNewestEventId : {asyncResult: true},
    waitForEvent: {asyncResult : true},
    //UI events
    expandParentComment : {asyncResult: false},
    selectComment : {asyncResult: false},
    startChatty : {asyncResult : false}
});

Actions.getChatty.listen(function() {
    reqwest({ url: BASE_URL + URLs.getChatty,
      crossOrigin: true,
      //type: "json"
    })
    .then(Actions.getChatty.completed)
    .catch(Actions.getChatty.failed);
});

Actions.getNewestEventId.listen(function() {
    reqwest({ url: BASE_URL + URLs.getNewestEventId,
      crossOrigin: true,
      //type: "json"
    })
    .then(Actions.getNewestEventId.completed)
    .catch(Actions.getNewestEventId.failed);
});

Actions.waitForEvent.listen(function(eventId) {
    reqwest({ url: BASE_URL + URLs.waitForEvent + eventId,
      crossOrigin: true,
      //type: "json"
    })
    .then(Actions.waitForEvent.completed)
    .catch(Actions.waitForEvent.failed);
});

module.exports = Actions;