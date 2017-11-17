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

  showSettings (event) {
    event.preventDefault();
  }

  callbackUsername = (username) => {
    this.setState({username: username});
  }


  render () {
    return (
      <Menu>
        <span id="photo"> </span>
        <p id="username" href="/">{this.state.username}</p>
        <a className="menu-item" href="/">Search</a>
        <a className="menu-item" href="">My favorites</a>
        <a className="menu-item" href="">Last searches</a>
        <a className="menu-item" href="">About</a>
        <a className="menu-item" href="">Log out</a>
        <Login callbackUsername={this.callbackUsername}/>
      </Menu>
    );
  }
}

export default menu;
