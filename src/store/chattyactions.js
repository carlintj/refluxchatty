var reqwest = require("reqwest");
var Reflux = require('reflux');

var URLs = {
  getChatty: "//winchatty.com/v2/getChatty",
  getNewestEventId: "//winchatty.com/v2/getNewestEventId",
  waitForEvent: "//winchatty.com/v2/waitForEvent?lastEventId=",
  verifyCredentials: "//winchatty.com/v2/verifyCredentials",
  getThread: "//winchatty.com/v2/getThread?id="
};

var Actions = Reflux.createActions({
  //Data events
  getChatty: {
    asyncResult: true
  },
  getNewestEventId: {
    asyncResult: true
  },
  waitForEvent: {
    asyncResult: true
  },
  getThread: {
    asyncResult: true
  },
  //UI events
  toggleParentComment: {
    asyncResult: false
  },
  highlightParent: {
    asyncResult: false
  },
  selectComment: {
    asyncResult: false
  },
  startChatty: {
    asyncResult: false
  },
  pauseChatty: { 
    asyncResult: false
  },
  selectNextParent: {
    asyncResult: false
  },
  selectPrevParent: {
    asyncResult: false
  },
  selectFirstParent: {
    asyncResult: false
  },
  selectLastParent: {
    asyncResult: false
  },
  selectNextComment: {
    asyncResult: false
  },
  selectPrevComment: {
    asyncResult: false
  },
  fullRefresh: {
    asyncResult: false
  },
  openReply: {
    asyncResult: false
  },
  submitComment: {
    asyncResult: false
  },
  showThreads: {
    asyncResult: false
  },
  hideSelectedThread: { 
    asyncResult: false
  },
  reorderThreads: {
    asyncResult: false
  },
  runSearch: {
    asyncResult: false
  },
  loadPostIfNotFound: {
    asyncResult: false
  },
  showNewThread: {
    asyncResult: false
  },
  cancelNewThread: {
    asyncResult: false
  },
});

Actions.getChatty.listen(function() {
  reqwest({
      url: URLs.getChatty,
      crossOrigin: true,
      //type: "json"
    })
    .then(Actions.getChatty.completed)
    .catch(Actions.getChatty.failed);
});

Actions.getNewestEventId.listen(function() {
  reqwest({
      url: URLs.getNewestEventId,
      crossOrigin: true,
      //type: "json"
    })
    .then(Actions.getNewestEventId.completed)
    .catch(Actions.getNewestEventId.failed);
});

Actions.waitForEvent.listen(function(eventId) {
  reqwest({
      url: URLs.waitForEvent + eventId,
      crossOrigin: true,
      //type: "json"
    })
    .then(Actions.waitForEvent.completed)
    .catch(Actions.waitForEvent.failed);
});

Actions.getThread.listen(function(threadId) {
  reqwest({
    url: URLs.getThread + threadId,
    crossOrigin: true,
  })
  .then(Actions.getThread.completed)
  .catch(Actions.getThread.failed);
});

module.exports = Actions;