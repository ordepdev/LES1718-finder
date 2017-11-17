import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { authenticate, logout} from '../../../utils/authentication';
import { GOOGLE_PROVIDER } from '../../../constants/login-providers';

class GoogleProviderLogin extends Component {

  onSuccessCallback = (response) => {
    authenticate(response.googleId, GOOGLE_PROVIDER);
  }

  onErrorCallback = (error) => {
    //TODO
  }

  renderButton = () => {
    if (this.props.authentication.isLoggedIn) {
      if (this.props.authentication.provider === GOOGLE_PROVIDER) {
        return (
          <button className="google-login" onClick={logout} >Logout</button>
        );
      }
    } else {
      return (
        <GoogleLogin
          clientId="516100194800-fk9fma2gacug78o873ando15isctvj0f.apps.googleusercontent.com"
          buttonText="Login With Google"
          className="google-login"
          onSuccess={this.onSuccessCallback}
          onFailure={this.responseGoogle}
        />
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderButton()}
      </div>
    );
  }
}

export default GoogleProviderLogin;
