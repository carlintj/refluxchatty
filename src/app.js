import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/root';
import configureStore from './store/reduxstore';

const store = configureStore();

ReactDOM.render(
  <div style={{background: '#EAEAEA'}}>
    <Root store={store} />
  </div>,
  document.getElementById('app')
);



// var Reflux = require('reflux');
// var StatusBar = require('./view/user/statusbar');
// var StatusMenu = require('./view/user/statusmenu');
// var ChattyStore = require('./store/chattystore');
// var UserStore = require('./store/userstore');
// import { Router, Route, IndexRoute,useRouterHistory } from 'react-router';
// var ChattyHome = require('./routes/chattyhome');
// var SinglePost = require('./routes/singlepost');
// var ChattyActions = require('./store/chattyactions');
// var UserActions = require('./store/useractions');
// var keymaster = require('keymaster');


// //here to remove ugly url stuff
// import { createHashHistory } from 'history'
// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

// var App = React.createClass({
//   mixins: [
//     Reflux.connect(UserStore,'UserStore'),
//     Reflux.connect(ChattyStore,'ChattyStore'),
//   ],
//   componentDidMount: function() {
//     keymaster('a', function() {
//        ChattyActions.selectPrevComment();
//     });
//     keymaster('z', function() {
//         ChattyActions.selectNextComment();
//     });
//   },
//   render: function () {
//     var showHomeLink = true;
//     var {ChattyStore, UserStore} = this.state;
//     return (<div>
//       <StatusBar 
//         showHomeLink={showHomeLink}
//         username={UserStore.username} 
//         connected={ChattyStore.connected}
//         showNewThreadBox={ChattyStore.showNewThreadBox}
//         unseenReplies={UserStore.unseenReplies}
//         fullRefresh={ChattyActions.fullRefresh}
//         reorderThreads={ChattyActions.reorderThreads}
//         showNewThread={ChattyActions.showNewThread}
//         cancelNewThread={ChattyActions.cancelNewThread}
        
//         />
//       <StatusMenu isMenuOpened={UserStore.isMenuOpened}
//         lastEventId={ChattyStore.eventId} 
//         username={UserStore.username} 
//         showLogin={UserStore.showLogin}
//         loginMessage={UserStore.loginMessage}
//         showSearch={this.state.showSearch}
//         pms={UserStore.pms}
//         unreadPMs={UserStore.unreadPMs}
//         unseenReplies={UserStore.unseenReplies}
//         totalPMs={UserStore.totalPMs}
//         reorderThreads={ChattyActions.reorderThreads}
//         showThreads={ChattyActions.showThreads}
//         />
//         {React.cloneElement(this.props.children, {UserStore,ChattyStore,chattyActions: ChattyActions,userActions: UserActions})}
//     </div>);
//   }
// });

// var routes = (
//   <Route handler={App}>
//     <Route path="/" component={App} >
//       <IndexRoute component={ChattyHome} />
//       <Route path="SinglePost/:threadId" component={SinglePost}/>
//     </Route>
    
//   </Route>
// );

// ReactDOM.render(<Router history={appHistory}>{routes}</Router>, document.getElementById('app'));
