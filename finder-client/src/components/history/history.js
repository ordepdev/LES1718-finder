import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import redo from '../../assets/redo.png';
import { hashHistory } from 'react-router'
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
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Search Details</TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                this.state.tableEntries.map((element, index) => {
                  return (
                    <TableRow>
                      <TableRowColumn>from Classroom B021 to Classroom B012</TableRowColumn>
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
