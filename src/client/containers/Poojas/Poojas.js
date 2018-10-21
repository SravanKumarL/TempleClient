import React from 'react';
import PoojasUsersGrid from '../DataGrid/poojasUsersGrid';
import withStyles from '@material-ui/core/styles/withStyles';
import constants from '../../../store/sagas/constants';
const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'auto',
  },
})
const Poojas = ({ classes }) => (
  <div className={classes.root}>
    <PoojasUsersGrid collection={constants.Poojas} />
  </div>
)
export default withStyles(styles)(Poojas);