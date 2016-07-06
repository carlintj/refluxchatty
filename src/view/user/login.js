var React = require('react');
var UserActions = require('../../store/useractions.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

module.exports = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {
      username: '',
      password: ''
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