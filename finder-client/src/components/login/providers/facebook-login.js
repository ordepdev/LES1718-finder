import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { authenticate } from '../../../utils/authentication';
import { FACEBOOK_PROVIDER } from '../../../constants/login-providers';

class FacebookProviderLogin extends Component {

  onSuccessCallback = (response) => {
    authenticate(response.userID, FACEBOOK_PROVIDER);
  }

  onErrorCallback = (error) => {
    //TODO
  }

  render() {
    let buttonText = "Login With Facebook";

    if (this.props.authentication.provider === FACEBOOK_PROVIDER) {
      buttonText = "Logout";
    }

    return (
      <FacebookLogin
        appId="452672998461342"
        autoLoad={false}
        icon="fa-facebook"
        cssClass="my-facebook-button-class"
        fields="name,email,picture"
        textButton={buttonText}
        callback={this.onSuccessCallback}
        onFailure={this.onErrorCallback}
      />
    );
  }
}

export default FacebookProviderLogin;
