import React from 'react';
import DataGridWrapper from '../DataGrid/dataGridWrapper';
import withStyles from '@material-ui/core/styles/withStyles';
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