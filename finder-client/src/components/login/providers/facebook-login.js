import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookProviderLogin extends Component {

  responseFacebook = (response) => {
    console.log(response);

  }

  render() {
    return (
      <FacebookLogin
        appId="452672998461342"
        autoLoad={true}
        fields="name,email,picture"
        callback={this.responseFacebook}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
      />
    );
  }
}

export default FacebookProviderLogin;
