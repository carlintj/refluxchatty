var Reflux = require('reflux');
var _ = require("lodash");
var ChattyActions = require("./chattyactions.js");

var ChattyStore = Reflux.createStore({
    listenables: [ChattyActions],
    init: function () {
        this.listenTo(ChattyActions.refreshChattySuccess, this.loadData);
        //this.listenTo(ChattyActions.expandParentComment, this.expandParentComment);
    },
    loadData: function(data){
        this.threads = data;
        this.trigger(this.threads);
    },
    getInitialState: function () {
        this.threads = [];
        return this.threads;
    },
    expandParentComment : function(parentId) {
        this.threads.each(function(thread) {
           thread.focused = (thread.id === parentId); 
        });
        
        this.trigger(this.threads);
    }
});

module.exports = ChattyStore;