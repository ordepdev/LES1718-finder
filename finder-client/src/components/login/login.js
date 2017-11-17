import React, { Component } from 'react';
import GoogleProviderLogin from './providers/google-login';
import FacebookProviderLogin from './providers/facebook-login';

class Login extends Component {
	render() {
		return (
			<div id="login">
				<GoogleProviderLogin />
				<FacebookProviderLogin />
			</div>
		);
	}
}

export default Login;
