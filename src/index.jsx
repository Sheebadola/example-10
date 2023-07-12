/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './routes'

import { Provider } from 'react-redux';
import store from './Store/store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App/>
  </Provider>
)
