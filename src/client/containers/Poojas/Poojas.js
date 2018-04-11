// import React, { Component } from 'react';
// import withStyles from 'material-ui/styles/withStyles';
// import { connect } from 'react-redux';

// import CircularProgress from 'material-ui/Progress/CircularProgress';
// import Button from 'material-ui/Button/Button';

// import TextField from '../../components/UI/TextField/TextField';
// import Table from '../../components/UI/Table/Table';
// import * as actions from '../../../store/actions';
// import Snackbar from '../../components/UI/Snackbar/Snackbar';

// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     flexGrow: 1,
//     width: '100%',
//     alignItems: 'center'
//   },
//   addSection: {
//     display: 'flex',
//     margin: '30px',
//     alignItems: 'center',
//   },
//   field: {
//     display: 'flex',
//     // marginLeft: 'auto',
//     marginRight: '20px',
//   },
//   button: {
//     width: 150,
//     height: '40px',
//     marginTop: '5px',
//     marginRight: 'auto',
//     marginLeft: '15px',
//   },
//   table: {
//     display: 'flex',
//   }
// });

// class Poojas extends Component {
//   state = {
//     poojaName: '',
//     amount: '',
//     snackOpen: false,
//   }
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.message) {
//       this.setState({
//         snackOpen: true,
//       });
//       this.props.getPoojaDetails();
//     }
//   }
//   componentDidMount() {
//     this.props.getPoojaDetails();
//   }
//   inputChangeHandler = (event, value) => {
//     switch (value) {
//       case 'poojaName':
//         this.setState({
//           poojaName: event.target.value,
//         });
//         break;
//       case 'amount':
//         this.setState({
//           amount: event.target.value,
//         });
//         break;
//       default:
//         break;
//     }
//   }
//   closeSnackHandler = () => {
//     this.setState({
//       snackOpen: false,
//     });
//   }
//   addClickHandler = () => {
//     this.setState({
//       poojaName: '',
//       amount: '',
//     })
//     this.props.addPooja({ poojaName: this.state.poojaName, amount: this.state.amount });
//   }
//   getColumns = () => {
//     return [
//       { name: 'Pooja Name', id: 'poojaName' },
//       { name: 'Amount', id: 'amount' },
//     ]
//   }
//   render() {
//     const { classes, loading, poojaDetails, message } = this.props;
//     const columns = this.getColumns();
//     let snackBar = null;
//     if (message) {
//       snackBar = (
//         <Snackbar
//           open={this.state.snackOpen}
//           close={this.closeSnackHandler}
//           message={this.props.message}
//         />
//       )
//     }
//     let circularProgress = null;
//     if (loading) {
//       circularProgress = (<CircularProgress />);
//     }
//     let poojas = null;
//     if (poojaDetails) {
//       poojas = (
//         <div className={classes.table}>
//           <Table
//             columns={columns}
//             rows={poojaDetails}
//           />
//         </div>
//       );
//     }
//     return (
//       <div className={classes.root}>
//         <div className={classes.addSection}>
//           <div className={classes.field}>
//             <TextField
//               value={this.state.poojaName}
//               changed={(event) => this.inputChangeHandler(event, 'poojaName')}
//               label='Pooja Name'
//               className={classes.field}
//               type='input'
//             />
//           </div>
//           <div className={classes.field}>
//             <TextField
//               className={classes.field}
//               value={this.state.amount}
//               changed={(event) => this.inputChangeHandler(event, 'amount')}
//               label='Amount'
//               type='number'
//             />
//           </div>
//           <Button onClick={this.addClickHandler} raised className={classes.button} color='primary'>
//             Add Pooja
//            </Button>
//         </div>
//         {circularProgress}
//         {poojas}
//         {snackBar}
//       </div>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     poojaDetails: state.poojas.poojaDetails,
//     message: state.poojas.message,
//     loading: state.poojas.loading,
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getPoojaDetails: () => {
//       dispatch(actions.getPoojaDetails())
//     },
//     addPooja: (poojaDetails) => {
//       dispatch(actions.addPooja(poojaDetails))
//     }
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Poojas));
import React from 'react';
import { DataGridWrapper } from '../DataGrid/dataGridWrapper';
import withStyles from 'material-ui/styles/withStyles';
import constants from '../../../store/sagas/constants';
const styles = theme => ({
  root: {
    flexGrow: 1
  },
})
const Poojas= ({classes})=>(
  <div className={classes.root}>
    <DataGridWrapper collection={constants.Poojas}/>
  </div>
)
export default withStyles(styles)(Poojas);