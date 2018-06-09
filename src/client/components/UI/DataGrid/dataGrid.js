import React from 'react';
import Paper from '@material-ui/core/Paper';
import PrintIcon from '@material-ui/icons/Print'
import FilterIcon from '@material-ui/icons/FilterList'
import ErrorSnackbar from '../Snackbar/errorSnackBar';
import { transactionType } from '../../../../store/sagas/constants';
import LoadingGrid from './loadingGrid';
import Button from '@material-ui/core/Button';
import printHtml from 'print-html-element';
import GridContainer from './GridContainer';
import PrintGrid from './PrintGrid';

export default class DataGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isPrintClicked: false,
            displayFilter: false,
            snackBarOpen: false,
            transaction: null,
            prevProps: {}
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
        if (this.props.rows && this.props.rows.length > 0)
            this.setState((prevState) => ({ displayFilter: !prevState.displayFilter }));
    }
    onPrintClicked = () => {
        this.setState({ isPrintClicked: true });
    }
    componentDidMount() {
        this.setAndCommitTransaction(transactionType.fetch.schema, this.props.collection, this.props.searchCriteria);
        this.setAndCommitTransaction(transactionType.fetch.data, this.props.collection, this.props.searchCriteria);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.isPrintClicked) {
            if (this.props.rows && this.props.rows.length > 0)
                printHtml.printElement(document.getElementById('paperGrid'));
            this.setState({ isPrintClicked: false });
        }
    }
    static getDerivedStateFromProps(props, state) {
        const { error, message } = props;
        if (message !== state.prevProps.message || error !== state.prevProps.error) {
            if ((message !== '' || error !== '')) {
                return ({ snackBarOpen: true, prevProps: { error: error, message: message } });
            }
            return null;
        }
        return null;
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
            isPrintClicked,
            transaction,
            displayFilter,
            snackBarOpen,
        } = this.state;
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
                    <Paper id="paperGrid">
                        {(rows && columns && rows.length && columns.length) &&
                            isPrintClicked ? <PrintGrid rows={rows} columns={columns} /> :
                            <GridContainer rows={rows}
                                columns={columns} collection={collection} setAndCommitTransaction={this.setAndCommitTransaction.bind(this)}
                                readOnly={readOnly} displayFilter={displayFilter} />}
                        {!isPrintClicked && <ErrorSnackbar message={message} open={snackBarOpen} redoTransaction={transaction}
                            onSnackBarClose={this.onSnackBarClose} error={error} />}
                    </Paper>
                </div>
        );
    }
}