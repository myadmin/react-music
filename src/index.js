import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import fastclick from 'fastclick';
import store from './store';
import App from './App';
import { Globalstyle } from './common';

fastclick.attach(document.body);

ReactDOM.render(
    <Provider store={store}>
        {/*全局去除默认样式*/}
        <Globalstyle />
        {/*app入口*/}
        <App />
    </Provider>,
    document.getElementById('root')
);

