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