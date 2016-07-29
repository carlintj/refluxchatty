import React from 'react';
import {Provider} from 'react-redux';
import App from './app';
import DevTools from './devtools';
//<DevTools />

let tools = <DevTools />;
tools = null;

export default ({store}) =>
    <Provider store={store}>
        <div>
            {tools}
            <App />
        </div>
    </Provider>