import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './client/App';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import reducer from './store/reducers/index';
import red from '@material-ui/core/colors/red';
import { watchAuth } from './store/sagas';

//Register service worker
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function () {
//     navigator.serviceWorker.register('/sw.js').then(registration => {
//       console.log('SW registered: ', registration);
//       registration.pushManager.subscribe({ userVisibleOnly: true });
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#410C40'
      main: '#60315f'
    },
    secondary: red,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    type: 'light', // Switching the dark mode on is a single property value change.
  },
});
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleWare)));

sagaMiddleWare.run(watchAuth);

const app = (
  <div>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  </div>
);
ReactDOM.render(app, document.getElementById('root'));
// registerServiceWorker();
