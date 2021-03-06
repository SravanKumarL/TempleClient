import React from 'react';
import Paper from '@material-ui/core/Paper';
import PrintIcon from '@material-ui/icons/Print'
import FilterIcon from '@material-ui/icons/FilterList'
import ErrorSnackbar from '../Snackbar/errorSnackBar';
import constants, { transactionType } from '../../../../store/sagas/constants';
import LoadingGrid from './loadingGrid';
import Button from '@material-ui/core/Button';
import printHtml from 'print-html-element';
import DataGrid from './DataGrid';
import PrintGridContainer from './PrintGridContainer';
import { FILTER_VISIBILITY } from '../../../../store/constants/components/datagrid';

const getDefaultPaginationOptions = props => ({ take: constants.minimumPageSize, skip: props.rows.length });
const fetchData = props => (type, collection, searchCriteria, pagingOptions = getDefaultPaginationOptions(props)) => {
    switch (type) {
        case transactionType.fetch.schema:
            props.fetchEntitySchema(collection, searchCriteria);
            break;
        case transactionType.fetch.data:
            props.fetchEntityData(collection, searchCriteria, pagingOptions, false, false);//default paging options
            break;
        default:
            return;
    }
}
export default class DataGridContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isPrintClicked: false,
            displayFilter: false,
            snackBarOpen: false,
            transaction: null,
            prevProps: {},
        };
        this.fetchData = fetchData(this.props).bind(this);
        this.currentPageChangedHandler = this.currentPageChangedHandler.bind(this);
        this.pageSizeChangedHandler = this.pageSizeChangedHandler.bind(this);
    }

    //#region Fetch handlers

    clearMessages = () => this.props.clearEntityMessages(this.props.collection);

    setAndfetchPaginatedData = (collection, pagingOptions = getDefaultPaginationOptions(this.props), isPrintReq = false) => {
        const transaction = () => this.props.fetchEntityData(collection, this.props.searchCriteria, pagingOptions, true, isPrintReq);
        this.setState({ transaction });
        transaction();
    }

    setAndCommitTransaction = (type, collection, change, changedObj) => {
        let transaction = null;
        switch (type) {
            case transactionType.fetch.schema:
            case transactionType.fetch.data:
                transaction = () => this.fetchData(type, collection, change);//Let paging options be default
                break;
            default:
                transaction = () => this.props.commitEntityTransaction(type, collection, change, changedObj);
                break;
        }
        this.setState({ transaction });
        this.clearMessages();
        transaction();
    }
    //#endregion
    currentPageChangedHandler = (currentPage, pageSize) => {
        this.setAndfetchPaginatedData(this.props.collection, { take: pageSize, skip: currentPage * pageSize });
        if (this.props.checkShowOthers) {
            this.props.checkShowOthers(currentPage, pageSize);
        }
    }
    pageSizeChangedHandler = (currentPage, currPageSize, pageSize) => {
        this.setAndfetchPaginatedData(this.props.collection, { take: pageSize, skip: currentPage * currPageSize });
        if (this.props.checkShowOthers) {
            this.props.checkShowOthers(undefined, pageSize);
        }
    }
    snackBarClosedHandler = () => {
        this.setState({ snackBarOpen: false, snackBarClosed: true });
        this.props.clearEntityMessages(this.props.collection);
    }
    filterClickedHandler = () => {
        if (this.props.rows && this.props.rows.length > 0)
            this.setState((prevState) => ({ displayFilter: !prevState.displayFilter }));
    }
    printClickedHandler = () => {
        if (!this.state.isPrintClicked) {
            if (!this.props.isPrintReq) {
                this.setAndfetchPaginatedData(this.props.collection, {}, true);
            }
            this.setState({ isPrintClicked: true });
        }
    }
    componentDidMount() {
        this.setAndCommitTransaction(transactionType.fetch.schema, this.props.collection, this.props.searchCriteria);
        this.setAndCommitTransaction(transactionType.fetch.data, this.props.collection, this.props.searchCriteria);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.isPrintClicked && this.props.printReq) {
            if (this.props.rows && this.props.rows.length > 0)
                printHtml.printElement(document.getElementById('paperGrid'));
            this.setState({ isPrintClicked: false });
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { error, message, loading, transaction } = nextProps;
        let update = null;
        if (message !== prevState.prevProps.message || error !== prevState.prevProps.error) {
            update = ({ prevProps: { error, message, loading }, snackBarOpen: error !== '' || message !== '' });
            if (transaction)
                update = { ...update, transaction };
        }
        else if (loading !== prevState.prevProps.loading) {
            update = { prevProps: { ...prevState.prevProps, loading } };
        }
        return update;
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
            title,
            OtherPrintComponents,
            printTitle,
            signature,
            defaultSorting
        } = this.props;
        const {
            isPrintClicked,
            transaction,
            displayFilter,
            snackBarOpen,
        } = this.state;
        const disabled = !(rows && columns && rows.length > 0 && columns.length > 0);
        return (
            loading ? <LoadingGrid columns={columns} /> :
                <div style={{ position: 'relative', margin: '2vh 2vw' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }} >
                        <FilterButton disabled={disabled} onFilterClicked={this.filterClickedHandler} displayFilter={displayFilter} />
                        <PrintButton disabled={disabled} onPrintClicked={this.printClickedHandler} />
                    </div>
                    <Paper id="paperGrid">
                        {(rows && columns && rows.length > 0 && columns.length > 0 && isPrintClicked) ?
                            <PrintGridContainer rows={rows} columns={columns} searchCriteria={searchCriteria}
                                printTitle={printTitle} signature={signature} defaultSorting={defaultSorting}>
                                {OtherPrintComponents ? <OtherPrintComponents /> : null}
                            </PrintGridContainer> :
                            <DataGrid rows={rows} defaultSorting={defaultSorting}
                                columns={columns} collection={collection} setAndCommitTransaction={this.setAndCommitTransaction.bind(this)}
                                readOnly={readOnly} displayFilter={displayFilter} onCurrentPageChanged={this.currentPageChangedHandler}
                                onPageSizeChanged={this.pageSizeChangedHandler} totalCount={totalCount} title={title} />}
                    </Paper>
                    <ErrorSnackbar message={message} open={snackBarOpen} redoTransaction={transaction}
                        onSnackBarClose={this.snackBarClosedHandler} error={error} />
                </div>
        );
    }
}
export const handleFetchData = fetchData;

const FilterButton = ({ disabled, onFilterClicked, displayFilter }) => {
    const { HIDE } = FILTER_VISIBILITY;
    const buttonStyle = getButtonStyle(disabled);
    return (<Button
        style={buttonStyle}
        color='default'
        variant='raised'
        disabled={disabled}
        onClick={onFilterClicked}>
        <FilterIcon style={{ margin: '0px 10px', fontWeight: 'bold' }} /> {displayFilter && HIDE} Filter
    </Button>);
}
const PrintButton = ({ disabled, onPrintClicked }) => (
    <Button
        style={getButtonStyle(disabled)}
        color='default'
        variant='raised'
        disabled={disabled}
        onClick={onPrintClicked}>
        <PrintIcon style={{ margin: '0px 10px', fontWeight: 'bold' }} /> Print
    </Button>
);
const getButtonStyle = disabled => {
    const style = { margin: 10, color: 'white', background: 'seagreen', borderRadius: 5 };
    return disabled ? { ...style, background: '#eee', color: 'grey' } : style;
}