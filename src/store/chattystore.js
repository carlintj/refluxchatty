var Reflux = require('reflux');
var _ = require("lodash");
var ChattyActions = require("./chattyactions.js");
var processThread = require("../util/apiservice.js").processThread;
var getPost = require("../util/apiservice.js").getPost;

var findChildComment = function(parentThread, childCommentId) {
    if(parentThread.id == childCommentId) return parentThread;
    
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
};

var getSiblings = function(parentThread, comment) {
    var parentComment = findChildComment(parentThread,comment.parentId);
    return parentComment.children;
};

var mergeEvents = function(threads, events) {
    _.forEach(events,function(event) {
        if(event.eventType == "newPost") {
            var newPost = event.eventData.post;
            if(newPost.parentId != "0") {
                var thread = _.find(threads, {id : newPost.threadId});
                var parent = findChildComment(thread,newPost.parentId);
                parent.children.push(getPost(newPost));
                thread.replyCount++;    
            } else {
                var newThread = processThread(newPost);
                this.threads.unshift(newThread);
            }
        }
    });
};

var ChattyStore = Reflux.createStore({
    listenables: [ChattyActions],
    init: function () {
        this.threads = [];
        this.loading = false;
        this.eventId = 0;
        this.connected = false;
        this.username = "";
    },
    getInitialState: function () {
        return {
          threads: [], 
          loading: false,
          username: "", 
          connected:false, 
          eventId: 0
        };
    },
    fullRefresh: function() {
      this.threads = [];
      this.startChatty();
    },
    sendData: function() {
      this.trigger({threads : this.threads, 
          loading: this.loading, 
          eventId: this.eventId,
          connected: this.connected,
          username: this.username
      });
    },
    startChatty: function() {
      ChattyActions.getNewestEventId();
    },
    getChatty: function(){
      this.loading = true;
      this.sendData();
    },
    getChattyCompleted: function(data) {
        this.threads = [];
        this.loading = false;
        _.each(data.threads,function(thread) {
            this.threads.push(processThread(thread));
        }.bind(this));
        this.sendData();
    },
    getChattyFailed: function(error) {
        console.error(error);
        this.loading = false;
        this.sendData();
    },
    getNewestEventId: function() {
      this.connected=true;
      this.loading=true;
      this.sendData();
    },
    getNewestEventIdCompleted: function(data) {
      this.loading = false;
      this.eventId = data.eventId;
      ChattyActions.getChatty();
      ChattyActions.waitForEvent(this.eventId);
      //process events
      this.sendData();  
    },
    getNewestEventIdFailed: function(error) {
      this.connected = false;
      console.error(error);
      this.loading = false;
      this.sendData();
    },
    waitForEventCompleted: function(data) {
        this.connected = true;
        this.eventId = data.lastEventId;
        mergeEvents(this.threads,data.events);
        this.sendData();
        ChattyActions.waitForEvent(this.eventId);
    },
    waitForEventFailed: function(error) {
        this.connected = false;
        console.log(error);
        this.sendData();
        ChattyActions.waitForEvent(this.eventId);
    },
    //UI events
    toggleParentComment : function(parentId) {
        if(parentId === undefined) {
            parentId = _.find(this.threads, {focused : true}).id;
        }
        var thread = _.find(this.threads,{id : parentId});
        thread.expanded = !thread.expanded;
        this.sendData();
    },
    highlightParent: function(parentId) {
      _.each(this.threads,function(thread){
          thread.focused = (thread.id == parentId);
      });
      this.sendData();
    },
    selectComment: function(parentId, commentId) {
        var parent = _.find(this.threads,{id : parentId});
        parent.expandedChildId = commentId;
        this.sendData();
    },
    selectNextParent: function() {
        var i = 0;
        var thread = undefined;
        
        for(;i<this.threads.length;i++) {
            if(this.threads[i].focused) {
                thread = this.threads[i+1];
                break;
            }
        }
        if(thread == undefined) {
            thread = this.threads[0];
        }
        this.highlightParent(thread.id);
    },
    selectPrevParent: function() {
        var i = this.threads.length-1;
        var thread = undefined;
        for(;i>=0;i--) {
            if(this.threads[i].focused) {
                thread = this.threads[i-1];
                break;
            }
        }

        if(thread == undefined) {
            thread = this.threads[0];
        }
        this.highlightParent(thread.id);
    },
    selectPrevComment: function() {
        var thread = _.find(this.threads, {focused : true});
        if(thread === undefined || thread.children.length == 0) return;
        
        if(thread.expandedChildId === 0) {
            thread.expandedChildId = thread.children[0].id;
        } else {
            var comment = findChildComment(thread,thread.expandedChildId);
            var siblings = getSiblings(thread,comment);
            var i = 0;
            for(;i < siblings.length;i++) {
                if(siblings[i].id == comment.id) {
                    break;
                }
            }
            if(i == 0) {
                thread.expandedChildId = comment.parentId;
            } else {
                //find the id of the last grandchild of the sibling
                thread.expandedChildId = siblings[i-1].id;
            }
            this.sendData();
        }
    },
    selectNextComment : function() {
        var thread = _.find(this.threads, {focused : true});
        if(thread === undefined || thread.children.length == 0) return;
        if(thread.expandedChildId === 0) {
            thread.expandedChildId = thread.children[0].id;
        } else {
            //if select comment has a child, select the first child
            //else if the selected comment has a sibling select the next one
            //else if find the next grand-cousin
            var comment = findChildComment(thread,thread.expandedChildId);
            if(comment.children.length > 0) {
                thread.expandedChildId = comment.children[0].id;
            } else {
                var found = false;
                var siblings = getSiblings(thread,comment);
                var finder = findChildComment(thread,comment.parentId);
                do {
                    for(var i = 0;i < siblings.length-1;i++) {
                        if(siblings[i].id === thread.expandedChildId) {
                            thread.expandedChildId = siblings[i+1].id;
                            found = true;
                            break;
                        }
                    }
                    if(!found){
                        thread.expandedChildId = finder.id;
                        siblings = getSiblings(thread,finder);
                        finder = findChildComment(thread,finder.parentId);
                    }
                } while(!found)
            }
        }
        this.sendData();
    }
});

module.exports = ChattyStore;