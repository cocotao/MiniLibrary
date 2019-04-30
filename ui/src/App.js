import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  // axios exmaple
  // Make a request for a user with a given ID
  axios.get('/json')
    .then(function (response) {
      // handle success
      console.log("request /json: " + response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  // Optionally the request above could also be done as
  axios.post('/signin', {
      name: "koa",
      password: "12345"
    })
    .then(function (response) {
      console.log("request /signin: " + response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  // Want to use async/await? Add the `async` keyword to your outer function/method.
  async function getUser() {
    try {
      const response = await axios.get('/json');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  getUser();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
