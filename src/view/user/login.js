import React from 'react';
import linkState from '../../util/linkstate'

module.exports = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
      };
  },
  render: function() {
    return(<div>
      <span>User name: </span><input type="text" 
          onChange={linkState(this, 'username')}
          value={this.state['username']}/>
      <span>Password: </span>
        <input type="password" 
          onChange={linkState(this, 'password')}
          value={this.state['password']}/>
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