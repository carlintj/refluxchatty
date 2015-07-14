var React = require("react/addons");
var Reflux = require("reflux");
var Chatty = require("./view/chatty.js");
var StatusBar = require("./view/user/statusbar.js");
var StatusMenu = require("./view/user/statusmenu.js");
var ChattyStore = require("./store/chattystore.js");
var UserStore = require("./store/userstore.js");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var ChattyHome = require("./routes/chattyhome.js");
var SinglePost = require("./routes/singlepost.js");

var App = React.createClass({
  mixins: [
    Reflux.connect(UserStore,"UserStore"),
    Reflux.connect(ChattyStore,"ChattyStore"),
  ],
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
      <RouteHandler UserStore={this.state.UserStore} 
        ChattyStore={this.state.ChattyStore} />
    </div>);
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute name="ChattyHome" handler={ChattyHome} />
    <Route name="SinglePost" handler={SinglePost}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});