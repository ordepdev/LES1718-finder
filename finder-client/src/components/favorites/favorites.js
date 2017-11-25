import React, { Component } from 'react';
import redo from '../../assets/redo.png';

class Favorites extends Component {
  render() {
    return (
      <div>
        <h1 className="tittle">My favorites</h1>
        <ul id="historyList">
          <li>Entrada na lista<img className="icon" alt="redo" src={redo} /></li>
        </ul>
      </div>
    );
  }
}

export default Favorites;
