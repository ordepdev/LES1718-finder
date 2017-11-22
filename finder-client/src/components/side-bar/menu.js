import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Login from '../login/login';
import { hashHistory, Link } from 'react-router'


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
        <a className="menu-item" href="">My favorites</a>
        <div className="menu-item">
          <Link to="/history">Last searches</Link>
        </div>
        <a className="menu-item" href="">About</a>
        <a className="menu-item" href="">Log out</a>
        <Login callbackUsername={this.callbackUsername} authentication={this.props.authentication} />
      </Menu>
    );
  }
}

export default menu;
