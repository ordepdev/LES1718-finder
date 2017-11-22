import React, { Component } from 'react';


class history extends Component {


  render() {
    return (
      <div>
        <h1 className="tittle">Last searches</h1>
        <div >
          <ul id="historyList">
            <li>  <h2 className="info"> from Classroom B021 to Classroom B012 <img className="icon" alt="redo" src="../redo.png" /> </h2> </li>
            <li>  <h2 className="info"> from Classroom B341 to Classroom B011 <img className="icon" alt="redo" src="./redo.png" /> </h2> </li>
            <li>  <h2 className="info"> from Classroom B221 to Classroom B023 <img className="icon" alt="redo" src="./redo.png" /> </h2> </li>
            <li>  <h2 className="info"> from Classroom B218 to Classroom B037 <img className="icon" alt="redo" src="./redo.png" /> </h2> </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default history;
