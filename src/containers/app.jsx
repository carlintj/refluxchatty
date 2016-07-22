import React from 'react';
import {connect} from 'react-redux';
import * as chattyactions from '../actions/chattyactions';
import { bindActionCreators } from 'redux'
import Chatty from '../view/chatty';

@connect(state => state)
export default class App extends React.Component {
  // dumpState() {
  //   let {dispatch} = this.props;
  //   let action = dumpState();
  //   dispatch(action);
  // }

  getChatty() {
    let {dispatch} = this.props;
    let action = chattyactions.getChatty();
    dispatch(action);
  }

  componentDidMount() {
    this.getChatty();
  }

  render() {
    const {chattyreducer, dispatch} = this.props;
    let boundActionCreators = bindActionCreators(chattyactions, dispatch)

    return (
      <div>
        <Chatty threads={chattyreducer.threads}
          visibleThreads={[]}
          replyingTo={0}
          username={""}
          chattyActions={boundActionCreators}
          userActions={null} />
      </div>
    );
  }
}