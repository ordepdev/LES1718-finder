import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import fav from '../../assets/fav.png';
import favAdd from '../../assets/favAdd.png';
import RaisedButton from 'material-ui/RaisedButton';
import { getRoom, getPath, getAuthInfo, checkFavorites, addFavorite, removeFavorite }
  from '../../utils/communication-manager';
import { getCookie } from '../../utils/cookie-handler';
import { SESSION_COOKIE_NAME } from '../../constants/configuration';
import { updateAuthInfo } from '../../utils/authentication';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentLocation: "",
      searchInput: "",
      inputErrorText: "",
      currentInputErrorText: "",
      errorMessage: "",
      showSecond: false,
      showFav: false,
      showFavAdd: false,
      label: "+"
      }
  }
  componentWillReceiveProps(nextProps) {
    console.log("favoriteButton");
    if (nextProps.authentication.isLoggedIn) {
      this.setState({
        showFav: true
      });
    }
    else {
      this.setState({
        showFav: false
      });
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      inputErrorText: event.target.name === "searchInput" ? "" : this.state.inputErrorText,
      currentInputErrorText: event.target.name === "currentLocation" ? "" : this.state.currentInputErrorText
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.removeAllLines();
    this.props.clearMarker();

    if (this.state.searchInput === "") {
      this.setState({ inputErrorText: "This field is required." });
    } else {

      if (!this.state.showSecond) {

        getRoom(this.state.searchInput).then((roomData) => {
          this.setState({
            errorData: undefined
          });

          let coordinates = roomData.coordinates.split(',');
          this.props.updateMarker(coordinates[0], coordinates[1]);

          checkFavorites(getCookie(SESSION_COOKIE_NAME)).then((response) => {
            console.log(response);
            if (!response.length) {
              return;
            }
            console.log(roomData);
            if (response.map(f => f.code).indexOf(roomData.name) >= 0) {
              this.setState({ showFavAdd: true });
            }
          }).catch((error) => {
            this.setState({
              errorData: error.message
            });
          });
        }).catch((error) => {
          this.setState({
            errorData: error.message
          });
        });

      } else if (this.state.currentLocation === "") {
        this.setState({ currentInputErrorText: "This field is required." });
      } else {
        getPath(this.state.currentLocation, this.state.searchInput, getCookie(SESSION_COOKIE_NAME)).then((pathData) => {
          let new_coord = pathData.path.map(path => path.coordinate);

          for (let i = 1; i < new_coord.length; i++) {
            let ori_coord = new_coord[i - 1].split(',');
            let dest_coord = new_coord[i].split(',');

            this.props.createLine(
              ori_coord[0], ori_coord[1],
              dest_coord[0], dest_coord[1]
            );
          }

        }).catch((error) => {
          this.setState({
            errorData: error.message
          });
        });
      }
    }
  }

  showSecond = (e) => {
    e.preventDefault();

    if (this.state.label === '-') {
      this.setState({
        label: "+",
        currentLocation: "",
        showSecond: !this.state.showSecond,
        showFav: true
      });
    }
    else {
      this.setState({
        label: "-",
        showSecond: !this.state.showSecond,
        showFav: false
      });
    }
  }
  addFav = (e) => {
    e.preventDefault();

    addFavorite(this.state.searchInput, getCookie(SESSION_COOKIE_NAME))
    .then((response) => {
      this.setState({ showFavAdd: true });
    }).catch((error) => {
      this.setState({
        errorData: error.message
      });
    });
  }
  removeFav = (e) => {
    e.preventDefault();

    removeFavorite(this.state.searchInput, getCookie(SESSION_COOKIE_NAME))
    .then((response) => {
      this.setState({ showFavAdd: false });
    }).catch((error) => {
      this.setState({
        errorData: error.message
      });
    });
  }

  render() {
    return (
      <div id="searchBar">

        {
          this.state.showSecond &&
          <TextField
            name="currentLocation"
            value={this.state.currentLocation.toUpperCase()}
            hintText="current location"
            errorText={this.state.currentInputErrorText}
            onChange={this.handleInputChange}
            className="searchInput"
          />
        }

        <TextField
          name="searchInput"
          value={this.state.searchInput.toUpperCase()}
          hintText="Search for a POI"
          errorText={this.state.inputErrorText}
          onChange={this.handleInputChange}
          className="searchInput"
        />

        <RaisedButton label={this.state.label} primary={true} className="navigationButton" onClick={this.showSecond} />
        {
          this.state.showFav && <img className="fav" alt="fav"
            src={this.state.showFav ? this.state.showFavAdd ? favAdd : fav : ''}
            onClick={this.state.showFav ? this.state.showFavAdd ? this.removeFav : this.addFav : ''} />
        }
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
