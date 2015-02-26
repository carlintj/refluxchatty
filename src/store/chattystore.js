var Reflux = require('reflux');
var _ = require("lodash");
var ChattyActions = require("./chattyactions.js");
var processThread = require("../util/apiservice.js");


var findChildComment = function(parentThread, childCommentId) {
    for(var i = 0; i < parentThread.children.length; i++) {
        var child = parentThread.children[i];
        if(child.id == childCommentId) {
            return child;
        }
        var grandchild = findChildComment(child,childCommentId);
        if(grandchild) {
            return grandchild;
        }
    }
    return undefined;
}

var ChattyStore = Reflux.createStore({
    listenables: [ChattyActions],
    init: function () {
        this.threads = [];
        this.loading = false;
        this.eventId = 0;
    },
    getChatty: function(){
        this.loading = true;
        this.sendData();
    },
    getChattyCompleted: function(data) {
        console.log("getChattyCompleted");
        this.threads = [];
        this.loading = false;
        _.each(data.threads,function(thread) {
            this.threads.push(processThread(thread));
        }.bind(this));
        this.sendData();
        ChattyActions.getNewestEventId();
    },
    getChattyFailed: function(error) {
        console.error(error);
        this.loading = false;
        this.sendData();
    },
    getNewestEventId: function() {
        this.loading = true;
        this.sendData();
    },
    getNewestEventIdCompleted: function(data) {
      this.loading =false;
      this.eventId = data.eventId;
      console.log("new event id: " + this.eventId)
      ChattyActions.waitForEvent(this.eventId);
      //process events
      this.sendData();  
    },
    getNewestEventIdFailed: function(error) {
      console.error(error);
      this.loading = false;
      this.sendData();
    },
    getInitialState: function () {
        this.threads = [];
        this.loading = false;
        return {threads: this.threads, loading: this.loading};
    },
    waitForEventCompleted: function(data) {
        console.log(data);
        this.eventId = data.lastEventId;
        this.sendData();
        ChattyActions.waitForEvent(this.eventId);
    },
    waitForEventFailed: function(error) {
        
    },
    expandParentComment : function(parentId) {
        _.each(this.threads,function(thread) {
           thread.focused = (thread.id === parentId); 
        });
        this.sendData();
    },
    selectComment: function(parentId, commentId) {
        var parent = _.find(this.threads,{id : parentId});
        parent.expandedChildId = commentId;
        this.sendData();
    },
    sendData: function() {
        this.trigger({threads : this.threads, 
            loading: this.loading, 
            eventId: this.eventId
        });
    },
    startChatty: function() {
        ChattyActions.getChatty();
    }
});

module.exports = ChattyStore;