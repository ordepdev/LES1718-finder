import React, { Component } from 'react';
<<<<<<< Updated upstream
import redo from '../../assets/redo.png';

class Favorites extends Component {
=======
import Dialog from 'material-ui/Dialog';
import fav from '../../assets/favAdd.png';
import { hashHistory } from 'react-router'
import { getFavorites } from '../../utils/communication-manager';
import { SESSION_COOKIE_NAME } from '../../constants/configuration';
import { FAVORITES_PATH, HOME_PATH } from '../../constants/path-names';
import { getCookie } from '../../utils/cookie-handler';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Favorites extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showDialog: this.props.location.pathname.replace(/\//g, '') === FAVORITES_PATH,
      tableEntries: undefined
    }
  }
componentWillMount() {
    if (this.props.authentication.isLoggedIn) {
      this.obtainTableEntries();
    }
  }
componentWillReceiveProps(nextProps) {
    if (this.state.tableEntries === undefined && nextProps.authentication.isLoggedIn) {
      this.obtainTableEntries();
    }
  }
  obtainTableEntries = () => {
    getFavorites(getCookie(SESSION_COOKIE_NAME)).then((favorites) => {
      this.setState({
        tableEntries: favorites
      });
    }).catch((error) => {
      this.setState({
        tableEntries: undefined
      });
    });
  }
handleDialog = (showDialog) => {
    this.setState({ showDialog: showDialog });

    if (!showDialog) {
      hashHistory.push(HOME_PATH);
    }
  }

renderTableZone = () => {
    if (this.state.tableEntries === undefined || this.state.tableEntries.length === 0) {
      return (
        <h3>There're no entries in the favorites to show.</h3>
      );
    } else {
      return (
        <div>
          <Table height="280px">
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Rooms</TableHeaderColumn>
                <TableHeaderColumn> </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {
                this.state.tableEntries.map((element, index) => {
                  return (
                    <TableRow key={index}>
                      <TableRowColumn>Room {element.code}</TableRowColumn>
                      <TableRowColumn><img className="fav" alt="fav" src={fav} /></TableRowColumn>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </div>
      );
    }
  }

>>>>>>> Stashed changes
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
