import React, { Component } from 'react';
import GoogleProviderLogin from './providers/google-login';
import FacebookProviderLogin from './providers/facebook-login';
import * as LoginProviders from '../../constants/login-providers';

class Login extends Component {
	render() {
		return (
			<div id="login">
				<GoogleProviderLogin 
					isSelectedProvider={this.props.authentication.provider === LoginProviders.GOOGLE_PROVIDER} 
					authentication={this.props.authentication} />
				<FacebookProviderLogin 
					isSelectedProvider={this.props.authentication.provider === LoginProviders.FACEBOOK_PROVIDER} 
					authentication={this.props.authentication} />
			</div>
		);
	}
}

export default Login;
