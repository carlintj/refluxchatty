var React = require("react/addons");
var Reflux = require("reflux");
var ChattyActions = require("../../store/chattyactions.js");
var ChattyStore = require("../../store/chattystore.js");
var UserActions = require("../../store/useractions.js");
var USerStore = require("../../store/userstore.js");

var loginScreen = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      username: "",
      password: ""
      };
  },
  render: function() {
    return(<div>
      <span>User name: </span><input type="text" valueLink={this.linkState('username')}/>
      <span>Password: </span><input type="password" valueLink={this.linkState('password')}/>
      <input type="submit" value="Login" onClick={this.onLogin} />
      <span>{this.props.loginMessage}</span>
    </div>
    );
  },
  onLogin: function() {
    UserActions.login(this.state.username,this.state.password);
  }
});

module.exports = loginScreen;