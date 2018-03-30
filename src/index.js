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
import Reboot from 'material-ui/Reboot';
// import blueGrey from 'material-ui/colors/blueGrey';
// import { deepOrange, red, lightGreen } from 'material-ui/colors';
import reducer from './store/reducers/index';
import indigo from 'material-ui/colors/indigo';
import red from 'material-ui/colors/red';
import { watchAuth } from './store/sagas';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: red,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    // type: 'dark', // Switching the dark mode on is a single property value change.
    type: 'light', // Switching the dark mode on is a single property value change.
  },
  // MuiTabs: {
  //   root: {
  //     backgroundColor: blueGrey[800],
  //     flexGrow: 1,
  //     // marginTop: theme.spacing.unit * 3,
  //     // backgroundColor: theme.palette.background.paper,
  //   },
  //   rootInherit: {
  //     margin: 5,
  //     marginTop: 0,
  //     marginBottom: 10,
  //     borderRadius: 8,
  //     height: 60,
  //     width: 100,
  //     color: '#eee',
  //     background: blueGrey[700],
  //     // borderBottomRightRadius: 0,
  //     // borderBottomLeftRadius: 0,
  //     // border: '1px solid #eee',
  //     boxShadow: '0px 8px 11px -5px rgba(0, 0, 0, 0.2), 0px 17px 26px 2px rgba(0, 0, 0, 0.14), 0px 6px 32px 5px rgba(0, 0, 0, 0.12)',
  //   },
  //   rootInheritSelected: {
  //     background: 'white !important',
  //     height: 75,
  //     color: 'green !important',
  //     fontWeight: 'bold',
  //   },
  //   wrapper: {
  //   flexDirection: 'row',
  //   },
  //   labelContainer: {
  //     paddingLeft: 12,
  //     paddingRight: 12,
  //   },
  // }
  // palette: {
  //   primary: deepOrange,
  //   secondary: lightGreen,
  //   error: red,
  //   // Used by `getContrastText()` to maximize the contrast between the background and
  //   // the text.
  //   contrastThreshold: 3,
  //   // Used to shift a color's luminance by approximately
  //   // two indexes within its tonal palette.n
  //   // E.g., shift from Red 500 to Red 300 or Red 700.
  //   tonalOffset: 0.2,
  //   // type: 'dark',
  // },
});
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleWare)));

sagaMiddleWare.run(watchAuth);

const app = (
  <div>
    <Reboot />
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
registerServiceWorker();
