import React, { Component } from 'react';


class Fav extends Component {


  render () {
    return (
      <div>
      <h1 className="tittle">My favorites</h1>
      <div id="historyList">
      <h2 className="info"> from Classroom B021 to Classroom B012 </h2>
      <h2 className="info"> from Classroom B341 to Classroom B011 </h2>
      <h2 className="info"> from Classroom B221 to Classroom B023 </h2>
      <h2 className="info"> from Classroom B218 to Classroom B037 </h2>
      </div>
      </div>
    );
  }
}

export default Fav;
