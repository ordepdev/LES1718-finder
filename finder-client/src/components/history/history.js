import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import redo from '../../assets/redo.png';
import { hashHistory } from 'react-router'
import { getCookie } from '../../utils/cookie-handler';
import { getHistory } from '../../utils/communication-manager';
import { SESSION_COOKIE_NAME } from '../../constants/configuration';
import { HISTORY_PATH, HOME_PATH } from '../../constants/path-names';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class History extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showDialog: this.props.location.pathname.replace(/\//g, '') === HISTORY_PATH,
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
    getHistory(getCookie(SESSION_COOKIE_NAME)).then((history) => {
      this.setState({
        tableEntries: history
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
        <h3>There're no entries in the history to show.</h3>
      );
    } else {
      return (
        <div>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Search Details</TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {
                this.state.tableEntries.map((element, index) => {
                  return (
                    <TableRow key={index}>
                      <TableRowColumn>From {element.from} to {element.to}</TableRowColumn>
                      <TableRowColumn><img className="icon" alt="redo" src={redo} /></TableRowColumn>
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

  render() {
    return (
      <div>
        <Dialog
          title="Search History"
          modal={false}
          open={this.state.showDialog}
          onRequestClose={() => this.handleDialog(false)}>

          {this.renderTableZone()}
        </Dialog>
      </div>
    );
  }
}

export default History;
