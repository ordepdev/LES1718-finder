import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Login from '../login/login';


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
        <p id="username" href="/">{this.state.username}</p>
        <a className="menu-item" href="/">Search</a>
        <a className="menu-item" href="/contact">Navigation</a>
        <a className="menu-item" href="/contact">My favorites</a>
        <a className="menu-item" href="/contact">Last searches</a>
        <a className="menu-item" href="/about">About</a>
        <a className="menu-item" href="/about">Log out</a>
        <Login callbackUsername={this.callbackUsername} authentication={this.props.authentication} />
      </Menu>
    );
  }
}

export default menu;
