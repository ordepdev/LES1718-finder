import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { hashHistory } from 'react-router'
import { getCookie } from '../../utils/cookie-handler';
import { getHistory } from '../../utils/communication-manager';
import { SESSION_COOKIE_NAME } from '../../constants/configuration';
import { ABOUT_PATH, HOME_PATH } from '../../constants/path-names';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class About extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showDialog: this.props.location.pathname.replace(/\//g, '') === ABOUT_PATH,
      tableEntries: undefined
    }
  }

  componentWillMount() {
    // if (this.props.authentication.isLoggedIn) {
    //   this.obtainTableEntries();
    // }
  }



  // obtainTableEntries = () => {
  //   getHistory(getCookie(SESSION_COOKIE_NAME)).then((history) => {
  //     this.setState({
  //       tableEntries: history
  //     });
  //   }).catch((error) => {
  //     this.setState({
  //       tableEntries: undefined
  //     });
  //   });
  // }

  handleDialog = (showDialog) => {
console.log("test");
    this.setState({ showDialog: showDialog });

    if (!showDialog) {
      hashHistory.push(HOME_PATH);
    }
  }

  // renderTableZone = () => {
  //   if (this.state.tableEntries === undefined || this.state.tableEntries.length === 0) {
  //     return (
  //       <h2>There are no entries in the history to show.</h2>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <Table height="280px">
  //           <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
  //             <TableRow>
  //               <TableHeaderColumn>Search Details</TableHeaderColumn>
  //               <TableHeaderColumn>Actions</TableHeaderColumn>
  //             </TableRow>
  //           </TableHeader>
  //           <TableBody displayRowCheckbox={false}>
  //             {
  //               this.state.tableEntries.map((element, index) => {
  //                 return (
  //                   <TableRow key={index}>
  //                     <TableRowColumn>From {element.from} to {element.to}</TableRowColumn>
  //                     <TableRowColumn><img className="redo" alt="redo" src={redo} /></TableRowColumn>
  //                   </TableRow>
  //                 );
  //               })
  //             }
  //           </TableBody>
  //         </Table>
  //       </div>
  //     );
  //   }
  // }

  render() {
    return (
      <div>
        <Dialog
          title="About"
          className = "dialog"
          modal={false}
          open={this.state.showDialog}
           onRequestClose={() => this.handleDialog(false)}>
           <div>
           <h3 id="about_info">Developed by Pedro Tavares, Carolina Catorze, Ricardo Almeida, Tiago Matias and Marta Vasconcelos on the master in Software Engineering, at FEUP. </h3>
           <p>Version 1.0 | 2017 </p>
           </div>
        </Dialog>
      </div>
    );
  }
}

export default About;
