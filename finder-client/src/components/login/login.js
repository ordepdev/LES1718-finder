import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login-component';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: "UserId",
            facebookId: "facebookId"
        }
    }

    updateState = (newUserId) => {
        this.setState({
            userId: newUserId
        });
    }

    updateFacebookState = (newUserId) => {
        this.setState({
            facebookId: newUserId
        });
    }


    responseGoogle = (response) => {
        console.log("sucess");
        console.log(response);
        console.log(response.profileObj.email);
        this.updateState(response.profileObj.email);
    }

    failGoogle = (response) => {
        console.log(response);
        console.log("Error");

    }

    responseFacebook = (response) => {
        console.log(response);
        this.updateFacebookState(response.name);
        this.props.callbackUsername(response.name);
    }

    render() {
        return (
          <div id="login">

            <label> {this.state.userId} </label>

            <GoogleLogin
                socialId="516100194800-fk9fma2gacug78o873ando15isctvj0f.apps.googleusercontent.com"
                className="google-login"
                scope="profile"
                fetchBasicProfile={false}
                responseHandler={this.responseGoogle}
                buttonText="Login With Google"/>

            <FacebookLogin
                  appId="452672998461342"
                  autoLoad={true}
                  fields="name,email,picture"
                  callback={this.responseFacebook}
                cssClass="my-facebook-button-class"
                icon="fa-facebook"
            />

            <label> {this.state.facebookId} </label>
          </div>

        );
      }
}

export default Login;
