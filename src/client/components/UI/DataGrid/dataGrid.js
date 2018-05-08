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
      snackBarOpen: false,
      transaction: null
    };
  }
  setAndCommitTransaction = (type, collection, change, changedObj) => {
    const { fetchSchema, fetchData, commitTransaction } = this.props;
    let transaction = null;
    switch (type) {
      case transactionType.fetch.schema:
        transaction = () => fetchSchema(collection, change);
        break;
      case transactionType.fetch.data:
        transaction = () => fetchData(collection, change);
        break;
      default:
        transaction = () => commitTransaction(type, collection, change, changedObj);
        break;
    }
    this.setState({ transaction });
    transaction();
  }
  onSnackBarClose = () => this.setState({ snackBarOpen: false });
  onFilterClick = () => {
    this.setState((prevState) => ({ displayFilter: !prevState.displayFilter }));
  }
  onPrintClicked = () => {
    printHtml.printElement(document.getElementById('datagridPaper'));
  }
  componentDidMount() {
    this.setAndCommitTransaction(transactionType.fetch.schema, this.props.collection, this.props.searchCriteria);
    this.setAndCommitTransaction(transactionType.fetch.data, this.props.collection, this.props.searchCriteria);
  }

  componentWillReceiveProps(nextProps) {
    const { error, message } = nextProps;
    if (error === '')
      this.setState({ transaction: null });
    if (message !== '' || error !== '')
      this.setState({ snackBarOpen: true });
  }
  render() {
    const {
      rows,
      loading,
      columns,
      error,
      message,
      readOnly,
      collection
    } = this.props;
    const {
      transaction,
      displayFilter,
      snackBarOpen,
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
              columns={columns} collection={collection} setAndCommitTransaction={this.setAndCommitTransaction.bind(this)}
              readOnly={readOnly} displayFilter={displayFilter} />
            <ErrorSnackbar message={snackBarMsg} open={snackBarOpen} redoTransaction={transaction}
              onSnackBarClose={this.onSnackBarClose} />
          </Paper>
        </div>
    );
  }
}