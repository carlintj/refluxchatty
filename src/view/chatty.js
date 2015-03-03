var React = require("react");
var Reflux = require("reflux");
var CommentList = require("./commentlist.js");
var ChattyActions = require("../store/chattyactions.js");
var ChattyStore = require("../store/chattystore.js");
var keymaster = require("keymaster");

//TODO add unmount for deregistering keymaster
var RefluxChatty = React.createClass({
    mixins: [Reflux.connect(ChattyStore)],
    getInitialState: function() {
      return ({previousEventId: 0})  ;
    },
    componentDidMount: function () {
        ChattyActions.startChatty();
        keymaster('a', function() {
           ChattyActions.selectPrevComment();
        });
        keymaster('z', function() {
            ChattyActions.selectNextComment();
        });
        keymaster('j', function() {
           ChattyActions.selectNextParent();
        });
        keymaster('k', function() {
            ChattyActions.selectPrevParent(); 
        });
        keymaster('x', function() {
            ChattyActions.toggleParentComment();
        });
    },
    componentDidUpdate: function() {
      
    },
    render: function() {
        return (<CommentList threads={this.state.threads}/>);
    }
});

module.exports = RefluxChatty;