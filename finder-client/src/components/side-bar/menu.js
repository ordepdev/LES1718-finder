import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Login from '../login/login';


class menu extends Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
      <Menu>
        <span id="photo"> </span>
        <p id="username" href="/">Username</p>
        <a className="menu-item" href="/">Search</a>
        <a className="menu-item" href="/contact">Navigation</a>
        <a className="menu-item" href="/contact">My favorites</a>
        <a className="menu-item" href="/contact">Last searches</a>
        <a className="menu-item" href="/about">About</a>
        <a className="menu-item" href="/about">Log out</a>
        <Login/>
      </Menu>
    );
  }
}
export default menu;
