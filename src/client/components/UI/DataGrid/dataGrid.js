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
import Typography from '@material-ui/core/Typography';
import PrintGrid from './PrintGrid';

export default class DataGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isPrintClicked: false,
            displayFilter: false,
            snackBarOpen: false,
            transaction: null,
            prevProps: {},
            fetchData: this.fetchData.bind(this),
            clearMessages: this.clearMessages.bind(this),
            countFetched: false
        };
    }
    defaultPaginationOptions = { pageSize: 5, count: this.props.rows.length }
    clearMessages = () => this.props.clearMessages(this.props.collection);
    setAndfetchPaginatedData = (collection, pagingOptions = this.defaultPaginationOptions, isPrintReq = false, fetchCount = false) => {
        const transaction = () => this.props.fetchData(collection, this.props.searchCriteria, pagingOptions, true, isPrintReq, fetchCount);
        this.setState({ transaction });
        transaction();
    }
    fetchData = (type, collection, searchCriteria = {}, pagingOptions = this.defaultPaginationOptions, fetchCount = false) => {
        switch (type) {
            case transactionType.fetch.schema:
                this.props.fetchSchema(collection, searchCriteria);
                break;
            case transactionType.fetch.data:
                this.props.fetchData(collection, searchCriteria, pagingOptions, false, false, fetchCount);//default paging options
                break;
            default:
                return;
        }
    }
    setAndCommitTransaction = (type, collection, change, changedObj) => {
        const { commitTransaction } = this.props;
        let transaction = null;
        switch (type) {
            case transactionType.fetch.schema:
            case transactionType.fetch.data:
                transaction = () => this.fetchData(type, collection, change, undefined, !this.state.countFetched);//Let paging options be default
                this.setState({ countFetched: true });
                break;
            default:
                transaction = () => commitTransaction(type, collection, change, changedObj);
                break;
        }
        this.setState({ transaction });
        this.clearMessages();
        transaction();
    }
    onSnackBarClose = () => {
        this.setState({ snackBarOpen: false, snackBarClosed: true });
        this.props.clearMessages(this.props.collection);
    }
    onFilterClick = () => {
        if (this.props.rows && this.props.rows.length > 0)
            this.setState((prevState) => ({ displayFilter: !prevState.displayFilter }));
    }
    onPrintClicked = () => {
        if (!this.state.isPrintClicked) {
            const transaction = () => this.setAndfetchPaginatedData(this.props.collection, { count: this.props.rows.length }, true);
            this.setState({ transaction, isPrintClicked: true });
            transaction();
        }
    }
    componentDidMount() {
        this.setAndCommitTransaction(transactionType.fetch.schema, this.props.collection, this.props.searchCriteria);
        this.setAndCommitTransaction(transactionType.fetch.data, this.props.collection, this.props.searchCriteria);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.isPrintClicked && !this.props.printReq) {
            if (this.props.rows && this.props.rows.length > 0)
                printHtml.printElement(document.getElementById('paperGrid'));
            this.setState({ isPrintClicked: false });
        }
    }
    static getDerivedStateFromProps(props, state) {
        const { error, message, searchCriteria, loading } = props;
        if (message !== state.prevProps.message || error !== state.prevProps.error) {
            return ({ prevProps: { error, message, searchCriteria, loading }, snackBarOpen: error !== '' || message !== '' });
        }
        else if (JSON.stringify(searchCriteria) !== JSON.stringify(state.prevProps.searchCriteria)) {
            state.fetchData(transactionType.fetch.schema, props.collection, searchCriteria);
            const transaction = () => state.fetchData(transactionType.fetch.data, props.collection, searchCriteria);
            transaction();
            state.clearMessages();
            return ({ prevProps: { ...state.prevProps, searchCriteria, loading }, transaction });
        }
        else if (loading !== state.prevProps.loading) {
            return ({ prevProps: { ...state.prevProps, loading } });
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
            collection,
            searchCriteria,
            count
        } = this.props;
        const {
            isPrintClicked,
            transaction,
            displayFilter,
            snackBarOpen,
        } = this.state;
        let pooja = '';
        let printRows = [...rows];
        let printColumns = [...columns];
        if (searchCriteria && searchCriteria.ReportName === 'Pooja' && isPrintClicked) {
            if (rows.length > 0) {
                printRows = printRows.reduce((accumulator, currValue) => {
                    pooja = accumulator[currValue.pooja];
                    accumulator[currValue.pooja] = [...(pooja || []), currValue];
                    return accumulator;
                }, {});
            }
            printColumns = printColumns.filter(column => column.name !== 'pooja');
        }
        const PrintGridContainer = () => (searchCriteria && searchCriteria.ReportName === 'Pooja' ?
            Object.keys(printRows).map(key =>
                (<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} key={key}>
                    <Typography variant='headline' align='center' style={{ marginBottom: 20, marginTop: 20, fontWeight: 400 }}>
                        {key}
                    </Typography>
                    <PrintGrid rows={printRows[key]} columns={printColumns} />
                </div>)) : <PrintGrid rows={printRows} columns={printColumns} />);
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
                        {(rows && columns && rows.length > 0 && columns.length > 0 && isPrintClicked) ? <PrintGridContainer /> :
                            <GridContainer rows={rows}
                                columns={columns} collection={collection} setAndCommitTransaction={this.setAndCommitTransaction.bind(this)}
                                readOnly={readOnly} displayFilter={displayFilter} fetchPaginatedData={this.setAndfetchPaginatedData} />}
                        {searchCriteria && searchCriteria.ReportName === 'Management' && (isPrintClicked || rows.length === count) &&
                            <Paper>
                                Others
                           </Paper>}
                        {!isPrintClicked && <ErrorSnackbar message={message} open={snackBarOpen} redoTransaction={transaction}
                            onSnackBarClose={this.onSnackBarClose} error={error} />}
                    </Paper>
                </div>
        );
    }
}