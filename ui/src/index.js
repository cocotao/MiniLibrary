import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'weui';
import 'react-weui/build/packages/react-weui.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import MainPage from './pages/MainPage'
import Login from './pages/Login'
import WeChatAuthorization from './pages/WeChatAuthorization'

/*
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
// import { orange } from '@material-ui/core/colors'
const theme = createMuiTheme({
  palette: {
    // primary: {
    //   light: orange[200], // same as '#FFCC80',
    //   main: '#FB8C00', // same as orange[600]
    //   dark: '#EF6C00',
    //   contrastText: 'rgb(0,0,0)'
    // }
  }
})
*/

ReactDOM.render(
  // <MuiThemeProvider theme={theme}>
    <Router>
         <Route path="/" component={Login} />
         <Route path="/wechatauthorization" component={WeChatAuthorization} />
         <Route path="/mainpage" component={MainPage} />
    </Router> 
      , document.getElementById('root'));
  // </MuiThemeProvider>, document.getElementById('root'));

serviceWorker.unregister();
