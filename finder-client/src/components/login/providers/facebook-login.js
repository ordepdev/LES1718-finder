import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { authenticate, logout } from '../../../utils/authentication';
import { FACEBOOK_PROVIDER } from '../../../constants/login-providers';

class FacebookProviderLogin extends Component {

  onSuccessCallback = (response) => {
    authenticate(response.userID, FACEBOOK_PROVIDER);
  }

  onErrorCallback = (error) => {
    //TODO
  }

  renderButton = () => {
    if (this.props.authentication.isLoggedIn) {
      if (this.props.authentication.provider === FACEBOOK_PROVIDER) {
        return (
          <button className="my-facebook-button-class" onClick={logout} >Logout</button>
        );
      }
    } else {
      return (
        <FacebookLogin
          appId="452672998461342"
          autoLoad={false}
          icon="fa-facebook"
          cssClass="my-facebook-button-class"
          fields="name,email,picture"
          textButton="Login With Facebook"
          callback={this.onSuccessCallback}
          onFailure={this.onErrorCallback}
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

export default FacebookProviderLogin;
