import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class WeChatAuthorization extends React.Component {
    state = {
      redirect : false
    };

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

          // let path = {
          //   pathname:'/mainpage/',
          //   state: {}
          // }
          // that.props.history.push(path);

          that.setState({redirect: true});
  
        }).catch(function (error) {
          console.log(error);
        });

        return <Redirect push to="/mainpage" />; //or <Redirect push to="/sample?a=xxx&b=yyy" /> 传递更多参数
    }
};


export default WeChatAuthorization;