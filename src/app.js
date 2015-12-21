var React = require("react");
var ReactDOM = require('react-dom');
var Reflux = require("reflux");
var Chatty = require("./view/chatty.js");
var StatusBar = require("./view/user/statusbar.js");
var StatusMenu = require("./view/user/statusmenu.js");
var ChattyStore = require("./store/chattystore.js");
var UserStore = require("./store/userstore.js");
import { Router, Route, IndexRoute } from 'react-router';
var ChattyHome = require("./routes/chattyhome.js");
var SinglePost = require("./routes/singlepost.js");
var ChattyActions = require("./store/chattyactions.js");
var keymaster = require("keymaster");

var App = React.createClass({
  mixins: [
    Reflux.connect(UserStore,"UserStore"),
    Reflux.connect(ChattyStore,"ChattyStore"),
  ],
  componentDidMount: function() {
    keymaster('a', function() {
       ChattyActions.selectPrevComment();
    });
    keymaster('z', function() {
        ChattyActions.selectNextComment();
    });
  },
  render: function () {
    var showHomeLink = true;
    return (<div>
      <StatusBar 
        showHomeLink={showHomeLink}
        username={this.state.UserStore.username} 
        connected={this.state.ChattyStore.connected}
        showNewThreadBox={this.state.ChattyStore.showNewThreadBox}
        unseenReplies={this.state.UserStore.unseenReplies}
        />
      <StatusMenu isMenuOpened={this.state.UserStore.isMenuOpened}
        lastEventId={this.state.ChattyStore.eventId} 
        username={this.state.UserStore.username} 
        showLogin={this.state.UserStore.showLogin}
        loginMessage={this.state.UserStore.loginMessage}
        showSearch={this.state.showSearch}
        pms={this.state.UserStore.pms}
        unreadPMs={this.state.UserStore.unreadPMs}
        unseenReplies={this.state.UserStore.unseenReplies}
        totalPMs={this.state.UserStore.totalPMs}
        />
        {React.cloneElement(this.props.children, {UserStore: this.state.UserStore,ChattyStore:this.state.ChattyStore})}
    </div>);
  }
});

var routes = (
  <Route handler={App}>
    <Route path="/" component={App} >
      <IndexRoute component={ChattyHome} />
      <Route path="SinglePost/:threadId" component={SinglePost}/>
    </Route>
    
  </Route>
);

ReactDOM.render(<Router>{routes}</Router>, document.getElementById('app'));