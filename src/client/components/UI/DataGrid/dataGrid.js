import React from 'react';
import Paper from 'material-ui/Paper';
import PrintIcon from 'material-ui-icons/Print'
import FilterIcon from 'material-ui-icons/FilterList'
import ErrorSnackbar from '../Snackbar/errorSnackBar';
import { transactionType } from '../../../../store/sagas/constants';
import LoadingGrid from './loadingGrid';
import Button from 'material-ui/Button';
import printHtml from 'print-html-element';
import GridContainer from './GridContainer';

export default class DataGrid extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayFilter: false,
      prevRows: [],
      rows: [],
      transaction: null,
      snackBarOpen: false
    };
    this.setAndCommitTransaction = (type, collection, data) => {
      let transaction;
      switch (type) {
        case transactionType.fetch.schema:
          transaction = () => this.props.fetchSchema(collection, data);
          break;
        case transactionType.fetch.data:
          transaction = () => this.props.fetchData(collection, data);
          break;
        case transactionType.modify:
        default:
          transaction = () => this.props.commitTransaction(type, collection, data);
          break;
      }
      transaction();
      this.setState({ transaction });
    }
    this.onSnackBarClose = () => this.setState({ snackBarOpen: false });
    this.onFilterClick = () => {
      this.setState((prevState) => ({ displayFilter: !prevState.displayFilter }));
    }
    this.onPrintClicked = () => {
      printHtml.printElement(document.getElementById('datagridPaper'));
    }
  }

  componentDidMount() {
    this.setAndCommitTransaction(transactionType.fetch.schema, this.props.collection, this.props.searchCriteria);
    this.setAndCommitTransaction(transactionType.fetch.data, this.props.collection, this.props.searchCriteria);
  }

  componentWillReceiveProps(nextProps) {
    let { rows, error, message } = nextProps;
    rows = rows.map((row, index) => ({ ...row, id: index }));
    if (error === '')
      this.setState({ transaction: null });
    if (rows)
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
      displayFilter,
      snackBarOpen,
      prevRows
    } = this.state;
    let snackBarMsg = message !== '' ? message : error;
    return (
      loading ? <LoadingGrid columns={columns} /> :
        <div style={{ position: 'relative' }}>
          <Button style={{
            zIndex: 1, position: 'absolute',
            marginLeft: `${(displayFilter ? (84 - 2) : 84)}%`, marginTop: '1.2%'
          }}
            onClick={this.onFilterClick}>
            <FilterIcon /> {displayFilter && 'Hide'} Filter
          </Button>
          <Button style={{
            zIndex: 1, position: 'absolute',
            marginLeft: `${(displayFilter ? (70 - 2) : 70)}%`, marginTop: '1.2%'
          }}
            onClick={this.onPrintClicked}>
            <PrintIcon /> Print {collection}
          </Button>
          <Paper id="datagridPaper">
            <GridContainer rows={rows}
              columns={columns} collection={collection} setAndCommitTransaction={this.setAndCommitTransaction}
              readOnly={readOnly} prevRows={prevRows} displayFilter={displayFilter} />
            <ErrorSnackbar message={snackBarMsg} open={snackBarOpen} redoTransaction={transaction}
              onSnackBarClose={this.onSnackBarClose} />
          </Paper>
        </div>
    );
  }
}