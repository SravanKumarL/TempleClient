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
import { FILTER_VISIBILITY } from '../../../../store/constants/components/datagrid';

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
    defaultPaginationOptions = { take: 5, skip: this.props.rows.length }
    clearMessages = () => this.props.clearEntityMessages(this.props.collection);
    setAndfetchPaginatedData = (collection, pagingOptions = this.defaultPaginationOptions, isPrintReq = false, fetchCount = false) => {
        const transaction = () => this.props.fetchEntityData(collection, this.props.searchCriteria, pagingOptions, true, isPrintReq, fetchCount);
        this.setState({ transaction });
        transaction();
    }
    fetchData = (type, collection, searchCriteria = {}, pagingOptions = this.defaultPaginationOptions, fetchCount = false) => {
        switch (type) {
            case transactionType.fetch.schema:
                this.props.fetchEntitySchema(collection, searchCriteria);
                break;
            case transactionType.fetch.data:
                this.props.fetchEntityData(collection, searchCriteria, pagingOptions, false, false, fetchCount);//default paging options
                break;
            default:
                return;
        }
    }
    setAndCommitTransaction = (type, collection, change, changedObj) => {
        const { commitEntityTransaction } = this.props;
        let transaction = null;
        switch (type) {
            case transactionType.fetch.schema:
            case transactionType.fetch.data:
                transaction = () => this.fetchData(type, collection, change, undefined, !this.state.countFetched);//Let paging options be default
                this.setState({ countFetched: true });
                break;
            default:
                transaction = () => commitEntityTransaction(type, collection, change, changedObj);
                break;
        }
        this.setState({ transaction });
        this.clearMessages();
        transaction();
    }
    onSnackBarClose = () => {
        this.setState({ snackBarOpen: false, snackBarClosed: true });
        this.props.clearEntityMessages(this.props.collection);
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
            totalCount,
            title
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
        const { HIDE } = FILTER_VISIBILITY;
        return (
            loading ? <LoadingGrid columns={columns} /> :
                <div style={{ position: 'relative', margin: '2vh 2vw' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }} >
                        <Button
                            style={{ margin: 10, color: 'white', background: 'seagreen', borderRadius: 5 }}
                            color='default'
                            variant='raised'
                            onClick={this.onFilterClick}>
                            <FilterIcon style={{ margin: '0px 10px', fontWeight: 'bold' }} /> {displayFilter && HIDE} Filter
                    </Button>
                        <Button
                            style={{ margin: 10, color: 'white', background: 'seagreen', borderRadius: 5 }}
                            color='default'
                            variant='raised'
                            onClick={this.onPrintClicked}>
                            <PrintIcon style={{ margin: '0px 10px', fontWeight: 'bold' }} /> Print
                        </Button>
                    </div>
                    <Paper id="paperGrid">
                        {(rows && columns && rows.length > 0 && columns.length > 0 && isPrintClicked) ? <PrintGridContainer /> :
                            <GridContainer rows={rows}
                                columns={columns} collection={collection} setAndCommitTransaction={this.setAndCommitTransaction.bind(this)}
                                readOnly={readOnly} displayFilter={displayFilter} fetchPaginatedData={this.setAndfetchPaginatedData}
                                totalCount={totalCount} title={title} />}
                        {searchCriteria && searchCriteria.ReportName === 'Management' && (isPrintClicked || rows.length === totalCount) &&
                            rows.length > 0 && columns.length > 0 &&
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