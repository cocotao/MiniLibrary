import React from 'react';

import axios from 'axios';


class WeChatAuthorization extends React.Component {

    render() {
        console.log(this.props.match);
        var query = this.props.location.search;
        var arr = query.split('&') // ['?code=', 'state=']
        var codeStr = arr[0].substr(6) // '1'
        console.log(codeStr);
        var that = this;
        axios({
          method: "GET",
          url: '/wechat/userinfo',
          data: {
            code: codeStr
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          // console.log(JSON.stringify(response));
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

        return null;
    }
};


export default WeChatAuthorization;