import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './utils/configureStore';
import history from './utils/history';

import App from './containers/App';
import GlobalStyle from './components/GlobalStyle'

import './index.scss';

// Create redux store with history
const initialState = {}
const store = configureStore(initialState, history)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
