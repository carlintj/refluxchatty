import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import * as chattyactions from '../actions/chattyactions';
import * as useractions from '../actions/useractions';
import { bindActionCreators } from 'redux'
import Chatty from '../view/chatty';
import StatusBar from '../view/user/statusbar';
import StatusMenu from '../view/user/StatusMenu';

@connect(state => state)
export default class App extends React.Component {
  // dumpState() {
  //   let {dispatch} = this.props;
  //   let action = dumpState();
  //   dispatch(action);
  // }
  constructor() {
    super();
    
  }

  getChatty() {
    const {dispatch} = this.props;
    const action = chattyactions.getChatty();
    dispatch(action);
  }

  componentWillMount() {
    const actions = _.merge(chattyactions, useractions);
    const {dispatch} = this.props;
    this.boundActionCreators = bindActionCreators(actions, dispatch);

    this.getChatty();
  }

  render() {
    const {chattyreducer} = this.props;
    

    return (
      <div>
        <StatusBar
          chattyActions={this.boundActionCreators}
          {...chattyreducer}
        />
        <StatusMenu
          chattyActions={this.boundActionCreators}
          {...chattyreducer}
          />
        <Chatty 
          chattyActions={this.boundActionCreators}
          {...chattyreducer}
          />
      </div>
    );
  }
}