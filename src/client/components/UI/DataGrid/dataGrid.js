import React from 'react';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import PrintIcon from 'material-ui-icons/Print'
import FilterIcon from 'material-ui-icons/FilterList'
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import ErrorSnackbar from '../Snackbar/errorSnackBar';
import { withStyles } from 'material-ui/styles';
import constants from '../../../../store/sagas/constants';
import LoadingGrid from './loadingGrid';
import { Typography, Button, TextField } from 'material-ui';
import printHtml from 'print-html-element';
import * as Buttons from './buttons'
import { EnumAvailableRoles, EditCell, Cell } from './Cell/CellFactory';
import { DeleteDialog } from './DeleteRowDialog';
import Grid from './Grid';
const styles = theme => ({
  lookupEditCell: {
    paddingTop: theme.spacing.unit * 0.875,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
  dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  },
});


const fetchType={
  schema:'schema',
  data:'data'
}

class DataGrid extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayFilter: false,
      prevRows: [],
      rows: [],
      transaction: null,     
    };
    this.setAndCommitTransaction = (type, collection, data) => {
      let transaction;
      switch (type) {
        case fetchType.schema:
          transaction = () => this.props.fetchSchema(collection, data);
        case fetchType.data:
          transaction = () => this.props.fetchData(collection, data);
        default:
          transaction = () => this.props.commitTransaction(type, collection, data);
      }
      transaction();
      this.setState({ transaction });
    }
  }

  componentDidMount() {
    this.setAndCommitTransaction(fetchType.schema, this.props.collection, this.props.searchCriteria);
    this.setAndCommitTrans(fetchType.data, this.props.collection, this.props.searchCriteria);
  }
  componentWillReceiveProps(nextProps) {
    let { rows, error, message } = nextProps;
    rows = rows.map((row, index) => ({ ...row, id: index }));
    if (error === '')
      this.setState({ transaction: null });
    if (rows && message === '')
      this.setState({ rows, prevRows: rows });
    else if (error !== '')
      this.setState({ rows: this.state.prevRows });
    if (message !== '' || error !== '')
      this.setState({ snackBarOpen: true });
    else
      this.setState({ snackBarOpen: false });
  }
  render() {
    const {
      classes,
      loading,
      columns,
      error,
      message,
      readOnly,
      collection
    } = this.props;
    const {
      rows,
      transaction,
      displayFilter
    } = this.state;
    let snackBarMsg = message !== '' ? message : error;
    return (
      loading ? <LoadingGrid columns={columns} /> :
        <div style={{ position: 'relative' }}>
          <Button style={{ zIndex: 1, position: 'absolute', marginLeft: `${(displayFilter ? (84 - 2) : 84)}%`, marginTop: '1.2%' }} onClick={this.onFilterClick}>
            <FilterIcon /> {displayFilter && 'Hide'} Filter
          </Button>
          <Button style={{ zIndex: 1, position: 'absolute', marginLeft: `${(displayFilter ? (70 - 2) : 70)}%`, marginTop: '1.2%' }} onClick={this.onPrintClicked}>
            <PrintIcon /> Print {collection}
          </Button>
          <Paper id="datagridPaper">
            <Grid/>
          </Paper>
        </div>
    );
  }
}

export default withStyles(styles, { name: 'DataGrid' })(DataGrid);