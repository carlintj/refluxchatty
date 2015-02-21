var reqwest = require("reqwest");
var _ = require("lodash");
var processThread = require("../util/apiservice.js");
var Reflux = require('reflux');


var Actions = Reflux.createActions([
    "refreshChatty",
    "refreshChattySuccess",
    "refreshChattyFail"
]);

Actions.refreshChatty.listen(function() {
    console.log("refreshChatty listen");
    var chattyUrl = 'https://refluxchatty-carlintj.c9.io/dummydata/dummyChatty.json';
    //"https://winchatty.com/v2/getChatty"
    reqwest({ url: chattyUrl,
      crossOrigin: true
    }).then(function(data) {
        console.log("refreshChatty data success");
        var threads = [];
        _.each(data.threads, function(thread) {
            threads.push(processThread(thread));
        });
        Actions.refreshChattySuccess(threads);
    }).fail(function(error) {
        console.log("refreshChatty error" +error);
    });
});

module.exports = Actions;
