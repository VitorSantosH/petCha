import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css'
import './index.css';
import App from './App';
import './assets/font-awesome/css/font-awesome.css'

import { Provider } from "react-redux";
import storeConfig from './services/redux/redux';

const store = storeConfig();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>

);

