import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/root';
import configureStore from './store/reduxstore';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: [
      'Open Sans::latin',
      'Roboto::latin'
      ]
  }
});


const store = configureStore();
let style = {
  background: '#96A3A1',
  fontFamily: 'Open Sans'
}

ReactDOM.render(
  <div style={style}>
    <Root store={store} />
  </div>,
  document.getElementById('app')
);