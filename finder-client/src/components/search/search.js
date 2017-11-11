import React, { Component } from 'react';
import SearchResult from './search-result';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { getRoom } from '../../utils/communication-manager';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      errorText: "",
      searchResult: undefined
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value,
      errorText: ""
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.searchInput === "") {
      this.setState({ errorText: "This field is required."});
    } else {
      getRoom(this.state.searchInput).then((roomData) => {
        this.setState({
          searchResult: {
            roomData: roomData,
            errorData: undefined
          }
        });
      }).catch((error) => {
        this.setState({
          searchResult: {
            roomData: undefined,
            errorData: error.message
          }
        });
      });
    }
  }

  render() {
    return (
      <div id="searchBar">
      <TextField
        // name="searchInput"
        // value={this.state.searchInput}
        hintText="current location"
        // errorText={this.state.errorText}
        // onChange={this.handleInputChange}
        className="searchInput"

      />

        <TextField
          name="searchInput"
          value={this.state.searchInput}
          hintText="Search for a POI"
          errorText={this.state.errorText}
          onChange={this.handleInputChange}
          className="searchInput"
        />
        <RaisedButton label="GO" primary={true} className="searchButton" onClick={this.handleSubmit} />

        {
          this.state.searchResult !== undefined &&
          <SearchResult data={this.state.searchResult}/>
        }

      </div>
    );
  }
}

export default Search;
