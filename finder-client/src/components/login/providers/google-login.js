import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { authenticate } from '../../../utils/authentication';
import { GOOGLE_PROVIDER } from '../../../constants/login-providers';

class GoogleProviderLogin extends Component {

  onSuccessCallback = (response) => {
    authenticate(response.googleId, GOOGLE_PROVIDER);
  }

  onErrorCallback = (error) => {
    //TODO
  }

  render() {
    let buttonText = "Login With Google";

    if (this.props.authentication.provider === GOOGLE_PROVIDER) {
      buttonText = "Logout";
    }

    return (
      <GoogleLogin
        clientId="516100194800-fk9fma2gacug78o873ando15isctvj0f.apps.googleusercontent.com"
        buttonText={buttonText}
        className="google-login"
        onSuccess={this.onSuccessCallback}
        onFailure={this.responseGoogle}
      />
    );
  }
}

export default GoogleProviderLogin;
