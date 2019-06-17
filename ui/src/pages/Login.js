import React from 'react';

import axios from 'axios';


class LoginPage extends React.Component {
    state = {
        loginInfo : ""
    }

    onLogin = (e) => {
        var that = this;
        axios({
            method: "GET",
            url: '/wechat/wxlogin',
            data: {},
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + 'XXX'
            }
          }).then(function (response) {
            that.setState({ loginInfo: response.toString() })
          }).catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (
            <div >
               <button onClick={() => this.onLogin()}>Wechat Login</button>
                <div> {this.state.loginInfo} </div>
            </div>
        );
    }
};


export default LoginPage;