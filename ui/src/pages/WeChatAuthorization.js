import React from 'react';

import axios from 'axios';


class WeChatAuthorization extends React.Component {

    render() {
        const query = this.props.match.location.search 
        const arr = query.split('&') // ['?code=', 'state=']
        const codeStr = arr[0].substr(5) // '1'
        const that = this;
        axios({
          method: "GET",
          url: '/userinfo',
          data: {},
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          console.log(JSON.stringify(response));
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("userInfo", response.userInfo);

          let path = {
            pathname:'/mainpage/',
            state: {}
          }
          that.props.history.push(path);
  
        }).catch(function (error) {
          console.log(error);
        });

        

        
        return;
    }
};


export default WeChatAuthorization;