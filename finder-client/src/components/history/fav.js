import React, { Component } from 'react';


class Fav extends Component {


  render () {
    return (
      <div>
      <h1 className="tittle">My favorites</h1>
      <ul id="historyList">
      <li>  <h2 className="info"> from Classroom B021 to Classroom B012 <img className="icon" alt="remove fav" src="./fav.png"/> </h2> </li>
      <li>  <h2 className="info"> from Classroom B341 to Classroom B011 <img className="icon" alt="remove fav" src="./fav.png"/> </h2> </li>
      <li>  <h2 className="info"> from Classroom B221 to Classroom B023 <img className="icon" alt="remove fav" src="./fav.png"/> </h2> </li>
      <li>  <h2 className="info"> from Classroom B218 to Classroom B037 <img className="icon" alt="remove fav" src="./fav.png"/> </h2> </li>
      </ul>
      </div>
    );
  }
}

export default Fav;
