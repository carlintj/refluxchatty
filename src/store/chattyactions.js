var reqwest = require("reqwest");
var _ = require("lodash");
var Reflux = require('reflux');

//prod

var URLs = {
    getChatty : "//winchatty.com/v2/getChatty",
    getNewestEventId: "//winchatty.com/v2/getNewestEventId",
    waitForEvent: "//winchatty.com/v2/waitForEvent?lastEventId=",
    verifyCredentials: "//winchatty.com/v2/verifyCredentials"
};

//dev
/*
var URLs = {
    getChatty : "//refluxchatty-carlintj.c9.io/dummydata/getChatty",
    getNewestEventId: "//refluxchatty-carlintj.c9.io/dummydata/getNewestEventId",
    waitForEvent: "//refluxchatty-carlintj.c9.io/dummydata/waitForEventlastEventId=",
    verifyCredentials: "//refluxchatty-carlintj.c9.io/dummydata/verifyCredentials"
};
*/

var Actions = Reflux.createActions({
    //Data events
    getChatty : {asyncResult: true},
    getNewestEventId : {asyncResult: true},
    waitForEvent: {asyncResult : true},
    //UI events
    toggleParentComment : {asyncResult : false},
    highlightParent : {asyncResult : false},
    selectComment : {asyncResult: false},
    startChatty : {asyncResult : false},
    selectNextParent: {asyncResult : false},
    selectPrevParent: {asyncResult : false},
    selectNextComment: {asyncResult : false},
    selectPrevComment: {asyncResult : false}
});

Actions.getChatty.listen(function() {
    reqwest({ url: URLs.getChatty,
      crossOrigin: true,
      //type: "json"
    })
    .then(Actions.getChatty.completed)
    .catch(Actions.getChatty.failed);
});

Actions.getNewestEventId.listen(function() {
    reqwest({ url: URLs.getNewestEventId,
      crossOrigin: true,
      //type: "json"
    })
    .then(Actions.getNewestEventId.completed)
    .catch(Actions.getNewestEventId.failed);
});

Actions.waitForEvent.listen(function(eventId) {
    reqwest({ url: URLs.waitForEvent + eventId,
      crossOrigin: true,
      //type: "json"
    })
    .then(Actions.waitForEvent.completed)
    .catch(Actions.waitForEvent.failed);
});

module.exports = Actions;