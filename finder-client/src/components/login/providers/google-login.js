import React, { Component } from 'react';
import GoogleLogin  from 'react-google-login';

class GoogleProviderLogin extends Component {

  responseGoogle = (response) => {
    console.log(response);
  }

  render() {
    return (
        <GoogleLogin
          clientId="516100194800-fk9fma2gacug78o873ando15isctvj0f.apps.googleusercontent.com"
          buttonText="Login With Google"
          className="google-login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
      />
    );
  }
}

export default GoogleProviderLogin;
