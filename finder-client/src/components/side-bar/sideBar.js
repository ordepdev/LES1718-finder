import React, { Component } from 'react';
import Menu from './menu';

class sideBar extends Component {
  render() {
    return (
      <div className="sideBar">
        <img className="logo" alt="logo" src="../logo.png" />
        <Menu authentication={this.props.authentication} />
      </div>
    );
  }
}
export default sideBar;
