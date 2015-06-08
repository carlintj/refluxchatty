var Reflux = require('reflux');
var _ = require("lodash");
var ChattyActions = require("./chattyactions.js");
var processThread = require("../util/apiservice.js").processThread;
var getPost = require("../util/apiservice.js").getPost;
var UserActions = require("./useractions.js");
var UserStore = require("./userstore.js");
var localStorage = require('store');

var findChildComment = function(parentThread, childCommentId) {
  if (parentThread.id == childCommentId) return parentThread;
  for (var i = 0; i < parentThread.children.length; i++) {
    var child = parentThread.children[i];
    if (child.id == childCommentId) {
      return child;
    }
    var grandchild = findChildComment(child, childCommentId);
    if (grandchild) {
      return grandchild;
    }
  }
  return undefined;
};

var getSiblings = function(parentThread, comment) {
  var parentComment = findChildComment(parentThread, comment.parentId);
  return parentComment.children;
};

var mergeEvents = function(threads, events, store) {
  try {
    _.each(events, (event) => {
      if (event.eventType == "newPost") {
        var newPost = event.eventData.post;
        if (newPost.parentId !== 0) {
          var thread = _.find(threads, {
            id: newPost.threadId
          });
          if (thread) {
            var parent = findChildComment(thread, newPost.parentId);
            if (parent) {
              var fixedPost = getPost(newPost);
              parent.children.push(fixedPost);
              thread.replyCount++;
              thread.latestReply = fixedPost.date;
              thread.latestReplyStr = fixedPost.dateStr;
              if (parent.author === store.username) {
                UserActions.newReplyNotification(thread.id, newPost.id);
              }
            }
            else {
              console.warn("unable to find parent comment in thread", newPost);
            }
          }
          else {
            console.warn("unable to find thread", newPost.threadId, newPost);
            ChattyActions.getThread(newPost.threadId);
            //store.connected= false;
          }
        } else {
          var newThread = getPost(newPost);
          newThread.latestReply = newThread.date;
          newThread.latestReplyStr = newThread.dateStr;
          newThread.threadId = newPost.threadId;
          if (newThread.author === "Shacknews") {
            newThread.body = newThread.body.replace("href=\"", "href=\"http://www.shacknews.com");
          } 

          store.threads.unshift(newThread);
        }
      }
    });
  }
  catch (e) {
    console.error("error merging events", e, events, threads);
    store.connected = false;
  }
};

var matchUsername = function(post, username) {
  return (post.author.toUpperCase().indexOf(username.toUpperCase()) > 0);
};

module.exports = Reflux.createStore({
  listenables: [ChattyActions],
  init: function() {
    this.threads = [];
    this.loading = false;
    this.eventId = 0;
    this.connected = false;
    //this is dumb should come from store but store doesn't send data until change happens
    this.username = localStorage.get('username');
    this.replyingTo = 0;
    this.visibleThreads = [];

    this.listenTo(UserStore, this.userStoreUpdate);
  },
  getInitialState: function() {
    return {
      threads: [],
      loading: false,
      username: "",
      connected: false,
      eventId: 0,
      visibleThreads: []
    };
  },
  fullRefresh: function() {
    this.threads = [];
    this.startChatty();
  },
  sendData: function() {
    this.trigger({
      threads: this.threads,
      loading: this.loading,
      eventId: this.eventId,
      connected: this.connected,
      username: this.username,
      replyingTo: this.replyingTo,
      visibleThreads: this.visibleThreads
    });
  },
  startChatty: function() {
    ChattyActions.getNewestEventId();
  },
  getChatty: function() {
    this.loading = true;
    this.sendData();
  },
  getChattyCompleted: function(data) {
    this.threads = [];
    this.loading = false;
    _.each(data.threads, (thread) => {
      this.threads.push(processThread(thread));
    });
    this.sendData();
    ChattyActions.waitForEvent(this.eventId);
  },
  getChattyFailed: function(error) {
    console.error(error);
    this.loading = false;
    this.sendData();
  },
  getNewestEventId: function() {
    this.connected = true;
    this.loading = true;
    this.sendData();
  },
  getNewestEventIdCompleted: function(data) {
    this.loading = false;
    if (data.eventId) {
      this.eventId = data.eventId;
      ChattyActions.getChatty();
    }
    else {
      this.connected = false;
    }

    this.sendData();
  },
  getNewestEventIdFailed: function(error) {
    this.connected = false;
    console.error(error);
    this.loading = false;
    this.sendData();
  },
  getThreadCompleted: function(data) {
    _.each(data.threads, (thread) => {
      this.threads.unshift(processThread(thread));
    });
    this.sendData();
  },
  waitForEventCompleted: function(data) {
    this.connected = true;
    if(data.lastEventId) {
      this.eventId = data.lastEventId;
      mergeEvents(this.threads, data.events, this);  
    } else { 
      this.connected = false; 
    }
    
    this.sendData();
    if (this.connected) {
      ChattyActions.waitForEvent(this.eventId);
    }
  },
  waitForEventFailed: function(error) {
    this.connected = false;
    console.error(error);
    this.sendData();
    ChattyActions.waitForEvent(this.eventId);
  },
  //UI events
  toggleParentComment: function(parentId) {
    if (parentId === undefined) {
      parentId = _.find(this.threads, {
        focused: true
      }).id;
    }
    var thread = _.find(this.threads, {
      id: parentId
    });
    thread.expanded = !thread.expanded;
    this.sendData();
  },
  highlightParent: function(parentId) {
    _.each(this.threads, (thread) => {
      if (thread.id === parentId) {
        thread.focused = true;
        if (thread.expandedChildId !== thread.id) {
          thread.expandedChildId = thread.id;
          this.replyingTo = 0;
        }
      }
      else {
        thread.focused = false;
        thread.expandedChildId = 0;
      }
    });
    this.sendData();
  },
  selectComment: function(parentId, commentId) {
    this.replyingTo = 0;
    var parent = null;
    _.each(this.threads, (thread) => {
      if (thread.id === parentId) {
        parent = thread;
        thread.focused = true;
      }
      else {
        thread.focused = false;
      }
    });

    if (parent.expandedChildId != commentId) {
      parent.expandedChildId = commentId;
      this.sendData();
    }
  },
  selectNextParent: function() {
    this.replyingTo = 0;
    var thread = undefined;
    for (var i = 0; i < this.threads.length; i++) {
      if (this.threads[i].focused) {
        thread = this.threads[i + 1];
        break;
      }
    }
    if (thread == undefined) {
      thread = this.threads[0];
    }
    this.highlightParent(thread.id);
  },
  selectPrevParent: function() {
    this.replyingTo = 0;
    var i = this.threads.length - 1;
    var thread = undefined;
    for (; i >= 0; i--) {
      if (this.threads[i].focused) {
        thread = this.threads[i - 1];
        break;
      }
    }

    if (thread == undefined) {
      thread = this.threads[0];
    }
    this.highlightParent(thread.id);
  },
  selectFirstParent: function() {
    this.highlightParent(this.threads[0].id);
    this.sendData();
  },
  selectLastParent: function() {
    this.highlightParent(this.threads[this.threads.length - 1].id);
    this.sendData();
  },
  selectPrevComment: function() {
    this.replyingTo = 0;
    var thread = _.find(this.threads, {
      focused: true
    });
    if (thread === undefined || thread.children.length === 0) return;

    if (thread.expandedChildId === 0) {
      thread.expandedChildId = thread.children[0].id;
    }
    else {
      var comment = findChildComment(thread, thread.expandedChildId);
      var siblings = getSiblings(thread, comment);
      var i = 0;
      for (; i < siblings.length; i++) {
        if (siblings[i].id == comment.id) {
          break;
        }
      }
      if (i == 0) {
        thread.expandedChildId = comment.parentId;
      }
      else {
        //find the id of the last grandchild of the sibling
        thread.expandedChildId = siblings[i - 1].id;
      }
      this.sendData();
    }
  },
  selectNextComment: function() {
    this.replyingTo = 0;
    var thread = _.find(this.threads, {
      focused: true
    });
    if (thread === undefined || thread.children.length == 0) return;
    if (thread.expandedChildId === 0) {
      thread.expandedChildId = thread.children[0].id;
    }
    else {
      var comment = findChildComment(thread, thread.expandedChildId);
      if (!comment) {
        thread.expandedChildId = comment.children[0].id;
      }
      else {
        if (comment.children.length > 0) {
          thread.expandedChildId = comment.children[0].id;
        }
        else {
          var found = false;
          var siblings = getSiblings(thread, comment);
          var finder = findChildComment(thread, comment.parentId);
          do {
            for (var i = 0; i < siblings.length - 1; i++) {
              if (siblings[i].id === thread.expandedChildId) {
                thread.expandedChildId = siblings[i + 1].id;
                found = true;
                break;
              }
            }
            if (!found) {
              thread.expandedChildId = finder.id;
              if(finder.parentId !== 0) {
                siblings = getSiblings(thread, finder);
                finder = findChildComment(thread, finder.parentId);  
              } else {
                found = true;
              }
            }
          } while (!found && finder)
        }
      }
    }
    this.sendData();
  },
  openReply: function(threadId,commentId) {
    if(!!threadId && !!commentId) {
      var thread = _.find(this.threads, {
        id: threadId
      });
      if(!!thread) {
        this.replyingTo = commentId;
        thread.expandedChildId = commentId;
        thread.focused = true;
      } else {
        console.warn("could not find thread to reply");
      }
    } else {
      this.replyingTo = 0;
      var thread = _.find(this.threads, {
        focused: true
      });
      if (thread) {
        this.replyingTo = thread.expandedChildId;
      }
      else {
        console.warn("could not find focused thread on openReply");
      }
    }
    
    this.sendData();
  },
  submitComment: function(parentCommentId, body) {
    this.replyingTo = 0;
    this.sendData();
    UserActions.requestSubmitComment(parentCommentId, body);
  },
  showThreads: function(threads) {
    this.visibleThreads = threads;
    this.sendData();
  },
  userStoreUpdate: function(status) {
    this.username = status.username;
  },
  hideSelectedThread: function() {
    var thread = _.find(this.threads, {
      focused: true
    });
    if (thread) {
      thread.hidden = true;
      ChattyActions.selectNextParent();
    }
  },
  reorderThreads: function() {
    this.threads = _.sortByOrder(this.threads, 'latestReply', false);
    ChattyActions.selectFirstParent();
  },
  runSearch: function(searchStr) { 
    var matcher = matchUsername;
    _.each(this.threads, (thread) => {
      thread.searchMatch =  matcher(thread,searchStr);
    });
    this.sendData();
  }
});