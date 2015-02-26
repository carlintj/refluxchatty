var React = require("react");
var Reflux = require("reflux");
var CommentList = require("./commentlist.js");
var ChattyActions = require("../store/chattyactions.js");
var ChattyStore = require("../store/chattystore.js");


var RefluxChatty = React.createClass({
    mixins: [Reflux.connect(ChattyStore)],
    getInitialState: function() {
      return ({previousEventId: 0})  ;
    },
    componentDidMount: function () {
        ChattyActions.startChatty();
    },
    componentDidUpdate: function() {
      
    },
    render: function() {
        return (<CommentList threads={this.state.threads}/>);
    }
})

module.exports = RefluxChatty;