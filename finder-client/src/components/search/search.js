import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { getRoom, getPath } from '../../utils/communication-manager';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
	  currentLocation: "",
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
	
	let locCoordenates = undefined;
	
	if(this.state.currentLocation != "")
	{
		getRoom(this.state.currentLocation).then((roomData) => {
        this.setState({
          errorData: undefined
        });
        locCoordenates = roomData.coordinates.split(',');
      }).catch((error) => {
        this.setState({
          errorData: error.message
        });
      });
	}
    if (this.state.searchInput === "") {
      this.setState({ inputErrorText: "This field is required." });
    } else {
      getRoom(this.state.searchInput).then((roomData) => {
        this.setState({
          errorData: undefined
        });
        let coordinates = roomData.coordinates.split(',');
		if(locCoordenates == undefined){
			this.props.updateMarker(coordinates[0], coordinates[1]);
		}
		else {
			console.log(this.props);
			//let pathData = undefined;
			getPath(this.state.currentLocation, this.state.searchInput).then((pathData) => {
        let new_coord = pathData.path.map(path => path.coordinate);
       
        for(var i = 1; i < new_coord.length; i++)
        {
          let ori_coord = new_coord[i-1].split(',');
          let dest_coord = new_coord[i].split(',');

          this.props.createLine (
            ori_coord[0],ori_coord[1],
            dest_coord[0], dest_coord[1]
          );
        }
        //console.log(ori_coord);
        //console.log(pathData);
/*
        new_coord.forEach(function(array) {
          console.log(array);
        }, this);*/


			}).catch((error) => {
				this.setState({
				  errorData: error.message
				});
			  });
			/*
			this.props.createLine (
			locCoordenates[1],locCoordenates[0],
			coordinates[1], coordinates[0]
			);*/
		}
		console.log(this.state.currentLocation);
		console.log(this.state.searchInput);
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
  if(this.state.label === '-'){
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
            name="currentLocation"
            value={this.state.currentLocation}
           hintText="current location"
           // errorText={this.state.errorText}
            onChange={this.handleInputChange}
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
