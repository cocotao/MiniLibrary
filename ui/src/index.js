import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import SignIn from './components/SignIn'
import BookList from './components/BookList'
import BorrowedList from './components/BorrowedList'
import WeUiDemo from './components/weuiDemo'
import WeUiTabBar from './components/weuiTabBar'

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

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
        <Route path="/" exact component={SignIn} 
           render={props => <SignIn {...props} />}
        />
        <Route path="/booklist/" component={BookList} />
        <Route path="/borrowlist/" component={BorrowedList} />
        <Route path="/weuidemo" component={WeUiDemo} />
        <Route path="/weuitabbar" component={WeUiTabBar} />
    </Router>
  </MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
