import React from 'react';
import {Provider} from 'react-redux';
import App from './app';
import DevTools from './devtools';

export default ({store}) =>
    <Provider store={store}>
        <div>
            <App />
            <DevTools />
        </div>
    </Provider>