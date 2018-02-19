import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './client/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';


import reducer from './store/reducers/index';
import { watchAuth } from './store/sagas';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
    // type: 'light', // Switching the dark mode on is a single property value change.
  },
});
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleWare)));

sagaMiddleWare.run(watchAuth);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
