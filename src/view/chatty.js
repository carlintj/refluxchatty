var React = require("react/addons");
var Reflux = require("reflux");
var CommentList = require("./posts/commentlist.js");
var StatusBar = require("./user/statusbar.js");
var ChattyActions = require("../store/chattyactions.js");
var ChattyStore = require("../store/chattystore.js");
var UserStore = require("../store/userstore.js");
var keymaster = require("keymaster");
var SearchBox = require("./posts/searchbox.js");

//TODO add unmount for deregistering keymaster
module.exports = React.createClass({
    mixins: [Reflux.connect(UserStore,"UserStore"),Reflux.connect(ChattyStore,"ChattyStore")
      ],
    getInitialState: function() {
      
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
        keymaster('r', function() {
          ChattyActions.openReply();
        });
        keymaster('home', function() {
            ChattyActions.selectFirstParent();
        });
        keymaster('end', function() {
            ChattyActions.selectLastParent();
        });
        keymaster('h', function() {
            ChattyActions.hideSelectedThread();
        });
        keymaster('f', () => {
          this.setState({showSearch: !this.state.showSearch});
        });
    },
    componentDidUpdate: function() {
      
    },
    render: function() {
      var searchBox = null;
      if(this.state.showSearch) {
        searchBox = <SearchBox />;
      }
      return (<div>
        <StatusBar username={this.state.UserStore.username} 
          pms={this.state.UserStore.pms}
          showLogin={this.state.UserStore.showLogin}
          loginMessage={this.state.UserStore.loginMessage}
          connected={this.state.ChattyStore.connected}
          lastEventId={this.state.ChattyStore.eventId} 
          totalPMs={this.state.UserStore.totalPMs} 
          unreadPMs={this.state.UserStore.unreadPMs}
          unseenReplies={this.state.UserStore.unseenReplies}
          />
        {searchBox}
        <CommentList threads={this.state.ChattyStore.threads} 
          visibleThreads={this.state.ChattyStore.visibleThreads}
          replyingTo={this.state.ChattyStore.replyingTo} 
          username={this.state.UserStore.username}/>
      </div>);
    }
});