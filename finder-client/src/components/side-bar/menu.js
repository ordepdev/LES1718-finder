import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Login from '../login/login';
import { Link } from 'react-router'

class menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "Not loggedin"
    }
  }

  callbackUsername = (username) => {
    console.log(username);
    this.setState({ username: username });
  }

  render() {
    return (
      <Menu>
        <span id="photo"> </span>
        <p id="username">{this.state.username}</p>
        <div className="menu-item">
          <Link to="favorites">My favorites</Link>
        </div>
        <div className="menu-item">
          <Link to="history">Last searches</Link>
        </div>
        <div className="menu-item">
          <Link to="about">About</Link>
        </div>
        <Login callbackUsername={this.callbackUsername} authentication={this.props.authentication} />
      </Menu>
    );
  }
}

export default menu;
