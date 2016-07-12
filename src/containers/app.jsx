import React from 'react';
import {connect} from 'react-redux';
import * as chattyactions from '../actions/chattyactions';
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

  render() {
    const {chattyreducer} = this.props;
    const getChatty = this.getChatty.bind(this);
    return (
      <div>
        <div onClick={getChatty}>
          redux chatty app
        </div>
        <Chatty threads={chattyreducer.threads}
          visibleThreads={[]}
          replyingTo={0}
          username={""}
          chattyActions={null}
          userActions={null} />
      </div>
    );
  }
}