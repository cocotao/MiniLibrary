import React from 'react';

import axios from 'axios';


class LoginPage extends React.Component {
    state = {
        loginInfo : ""
    }

    onLogin = (e) => {
        var redirectPage = '/WeChatAuthorization';
        var return_uri = 'http%3A%2F%2F127.0.0.1%2F' + redirectPage;
        var AppID = 'wx88094ad370bf30a8';
        var scope = 'snsapi_userinfo';
        var wechatPath = 'https://open.weixin.qq.com/connect/oauth2/authorize'
          + '?appid=' + AppID
          + '&redirect_uri=' + return_uri
          + '&response_type=code' 
          + '&scope=' + scope
          + '&state=STATE#wechat_redirect';

        window.location.href = wechatPath;
    }

    render() {
      var redirectPage = 'WeChatAuthorization';
        var return_uri = 'http%3A%2F%2F127.0.0.1%2F' + redirectPage;
        var AppID = 'wx88094ad370bf30a8';
        var scope = 'snsapi_userinfo';
        var wechatPath = 'https://open.weixin.qq.com/connect/oauth2/authorize'
          + '?appid=' + AppID
          + '&redirect_uri=' + return_uri
          + '&response_type=code' 
          + '&scope=' + scope
          + '&state=STATE#wechat_redirect';

        return (
            <div >y
               <button onClick={() => this.onLogin()}>Wechat Login</button>
                <div> {this.state.loginInfo} </div>

                <a href = {wechatPath}>直接跳转到微信提供的网页</a>
            </div>
        );
    }
};


export default LoginPage;