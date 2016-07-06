var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var Chatty = require('./view/chatty.js');
var StatusBar = require('./view/user/statusbar.js');
var StatusMenu = require('./view/user/statusmenu.js');
var ChattyStore = require('./store/chattystore.js');
var UserStore = require('./store/userstore.js');
import { Router, Route, IndexRoute,useRouterHistory } from 'react-router';
var ChattyHome = require('./routes/chattyhome.js');
var SinglePost = require('./routes/singlepost.js');
var ChattyActions = require('./store/chattyactions.js');
var UserActions = require('./store/useractions.js');
var keymaster = require('keymaster');


//here to remove ugly url stuff
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

var App = React.createClass({
  mixins: [
    Reflux.connect(UserStore,'UserStore'),
    Reflux.connect(ChattyStore,'ChattyStore'),
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
    var {ChattyStore, UserStore} = this.state;
    return (<div>
      <StatusBar 
        showHomeLink={showHomeLink}
        username={UserStore.username} 
        connected={ChattyStore.connected}
        showNewThreadBox={ChattyStore.showNewThreadBox}
        unseenReplies={UserStore.unseenReplies}
        fullRefresh={ChattyActions.fullRefresh}
        reorderThreads={ChattyActions.reorderThreads}
        showNewThread={ChattyActions.showNewThread}
        cancelNewThread={ChattyActions.cancelNewThread}
        
        />
      <StatusMenu isMenuOpened={UserStore.isMenuOpened}
        lastEventId={ChattyStore.eventId} 
        username={UserStore.username} 
        showLogin={UserStore.showLogin}
        loginMessage={UserStore.loginMessage}
        showSearch={this.state.showSearch}
        pms={UserStore.pms}
        unreadPMs={UserStore.unreadPMs}
        unseenReplies={UserStore.unseenReplies}
        totalPMs={UserStore.totalPMs}
        reorderThreads={ChattyActions.reorderThreads}
        showThreads={ChattyActions.showThreads}
        />
        {React.cloneElement(this.props.children, {UserStore,ChattyStore,chattyActions: ChattyActions,userActions: UserActions})}
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

ReactDOM.render(<Router history={appHistory}>{routes}</Router>, document.getElementById('app'));