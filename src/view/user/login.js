import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

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
    const {username, password} = this.state;
    this.props.chattyActions.login(username,password);
  }
});