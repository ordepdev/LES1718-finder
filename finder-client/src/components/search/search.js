import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { getRoom } from '../../utils/communication-manager';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      inputErrorText: "",
      errorMessage: "",
      showSecond: false,
      label: "+"
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      inputErrorText: ""
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.searchInput === "") {
      this.setState({ inputErrorText: "This field is required." });
    } else {
      getRoom(this.state.searchInput).then((roomData) => {
        this.setState({
          errorData: undefined
        });

        let coordinates = roomData.coordinates.split(',');
        this.props.updateMarker(coordinates[0], coordinates[1]);
      }).catch((error) => {
        this.setState({
          errorData: error.message
        });

        this.props.clearMarker();
      });
    }
  }
  showSecond = (e) => {
    e.preventDefault();
    console.log("sucess");

  this.setState({showSecond: !this.state.showSecond});
  if(this.state.label == '-'){
      this.setState({label: "+"});
  }
  else{
    this.setState({label: "-"});
  }
  

  }

  render() {
    return (
      <div id="searchBar">


      {
        this.state.showSecond &&
        <TextField
            name="searchInput"
           // value={this.state.searchInput}
           hintText="current location"
           // errorText={this.state.errorText}
           // onChange={this.handleInputChange}
           className="searchInput"

         />
      }
        <TextField
          name="searchInput"
          value={this.state.searchInput}
          hintText="Search for a POI"
          errorText={this.state.inputErrorText}
          onChange={this.handleInputChange}
          className="searchInput"
        />
        <RaisedButton label={this.state.label} primary={true} className="navigationButton" onClick={this.showSecond} />
        <RaisedButton label="GO" primary={true} className="searchButton" onClick={this.handleSubmit} />
        {
          this.state.errorData !== undefined &&
          <div>
            {this.state.errorData}
          </div>
        }

      </div>
    );
  }
}

export default Search;
