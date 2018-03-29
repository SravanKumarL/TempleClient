// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';
// import Tabs, { Tab } from 'material-ui/Tabs';
// import Typography from 'material-ui/Typography';
// import { blueGrey } from 'material-ui/colors'
// import { Receipt } from 'material-ui-icons';
// import Transactions from '../../../containers/Transactions/Transactions';
// function TabContainer(props) {
//   return (
//     <Typography component="div" style={{
//       display: 'flex',
//       flexDirection: 'column',
//       background: 'white',
//       color: 'black',
//       height: '100%',
//       marginLeft: 5,
//       padding: 8 * 3,
//       paddingTop: '10px',
//       paddingBottom: '66px',
//       marginRight: '40px',
//       borderTopRightRadius: '10px,'
//     }}>
//       {props.children}
//     </Typography >
//   );
// }

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// const styles = theme => ({
//   root: {
//     backgroundColor: blueGrey[800],
//     flexGrow: 1,
//   },
//   flexContainer: {
//     display: 'inline-flex',
//   },
//   indicator: {
//     background: 'white',
//   },
//   rootInheritSelected: {
//     background: 'white !important',
//     height: 75,
//     color: 'green !important',
//     fontWeight: 'bold',
//   },
//   wrapper: {
//     flexDirection: 'row',
//   },
//   rootInherit: {
//     margin: 5,
//     marginTop: 0,
//     marginBottom: 10,
//     borderRadius: 8,
//     height: 60,
//     width: 100,
//     color: '#eee',
//     background: blueGrey[700],
//     boxShadow: theme.shadows[17],
//   },
//   labelContainer: {
//     paddingLeft: 12,
//     paddingRight: 12,
//   },
//   tabContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     flexGrow: 1,
//     height: '100%',
//   },
//   span: {
//     height: 18,
//     background: 'white',
//     color: blueGrey[500],
//     textAlign: 'center',
//     paddingTop: 20,
//     transiton: 'initial',
//   }
// });

// class SimpleTabs extends React.Component {
//   state = {
//     activeTab: 'transactions',
//   };

//   handleChange = (event, value) => {
//     this.setState({ value });
//   };

//   render() {
//     const { classes } = this.props;
//     const { activeTab } = this.state;
//     const newTabClasses = {
//       rootInherit: classes.rootInherit,
//       rootInheritSelected: classes.rootInheritSelected,
//       wrapper: classes.wrapper,
//       labelContainer: classes.labelContainer,
//     };
//     return (
//       <div className={classes.root}>
//         <Tabs
//           classes={{
//             root: classes.root,
//             flexContainer: classes.flexContainer,
//           }}
//           fullWidth
//           value={activeTab}
//           onChange={this.handleChange}
//           indicatorClassName={classes.span}
//         >
//           <Tab classes={newTabClasses} label="Transactions" value='transactions' icon={<Receipt />} />
//           <Tab label="Reports" value='reports' classes={newTabClasses} />
//         </Tabs>
//         <div className={classes.tabContainer}>
//           {value === 0 && <TabContainer></TabContainer>}
//           {value === 1 && <TabContainer>Item Two</TabContainer>}
//           {value === 2 && <TabContainer>Item Three</TabContainer>}
//         </div>
//       </div>
//     );
//   }
// }

// SimpleTabs.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SimpleTabs);