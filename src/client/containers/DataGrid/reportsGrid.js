import React, { Fragment } from 'react';
import DataGridContainer, { handleFetchData } from '../../components/UI/DataGrid/DataGridContainer';
import createContainer from '../../hoc/createContainer/createContainer';
import sharedMapStateToProps from './sharedMapStateToProps';
import constants, { transactionType } from '../../../store/sagas/constants';
import PaperedGrid from '../../components/UI/DataGrid/PaperedGrid';
import TotalPaper from '../../components/UI/DataGrid/TotalPaper';

const searchCriteriaChangedHandler = (nextProps, prevState) => {
    const { searchCriteria, collection, loading } = nextProps;
    prevState.fetchData(nextProps)(transactionType.fetch.schema, collection, searchCriteria);
    const transaction = () => prevState.fetchData(nextProps)(transactionType.fetch.data, collection, searchCriteria);
    transaction();
    return {
        prevProps: { ...prevState.prevProps, searchCriteria, loading, othersFetched: false }, transaction,
        showTotalOthers: false, othersFetchReq: false
    };
}

const loadingChangedHandler = (nextProps, prevState) => {
    let transaction = null;
    const { searchCriteria, collection, countFetched } = nextProps;
    let othersFetchReq = false;
    if (countFetched && searchCriteria.ReportName === constants.Management && !prevState.othersFetchReq) {
        othersFetchReq = true;
        nextProps.fetchEntityData(collection, searchCriteria, {}, true);//Fetch Others
        transaction = () => nextProps.fetchTotal(collection, searchCriteria);//Fetch Total
        transaction();
    }
    return { prevProps: { ...prevState.prevProps, loading }, transaction, othersFetchReq };
}

const onOthersFetchedHandler = (nextProps, prevState) => {
    let stateUpdate = { prevProps: { ...prevState.prevProps, othersFetched: nextProps.othersFetched } };
    if (constants.minimumPageSize >= nextProps.totalCount)
        stateUpdate = { ...stateUpdate, showTotalOthers: true };
    return stateUpdate;
}

const getStateUpdate = (nextProps, prevState) => {
    const { searchCriteria, loading } = nextProps;
    if (JSON.stringify(searchCriteria) !== JSON.stringify(prevState.prevProps.searchCriteria)) {
        return searchCriteriaChangedHandler(nextProps, prevState);
    }
    else if (loading !== prevState.prevProps.loading) {
        return loadingChangedHandler(nextProps, prevState);
    }
    else if (prevState.prevProps.othersFetched !== nextProps.othersFetched) {
        return onOthersFetchedHandler(nextProps, prevState);
    }
    return null;
}
class ReportsGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevProps: {},
            transaction: null,
            showTotalOthers: false,
            othersFetchReq: false,
            fetchData: props => handleFetchData(props)
        }
        this.checkShowTotalOthersHandler = this.checkShowTotalOthersHandler.bind(this);
    }
    checkShowTotalOthersHandler = (currentPage, pageSize) => {
        const { totalCount } = this.props;
        const lastPageNumber = Math.floor(totalCount / pageSize);
        let showTotalOthers = false;
        showTotalOthers = pageSize === 0 || pageSize >= totalCount; // For 'All' in pagesize, value of pagesize = 0
        if (!showTotalOthers && currentPage) {
            showTotalOthers = (currentPage + 1) >= lastPageNumber;
        }
        this.setState({ showTotalOthers });
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.prevProps.searchCriteria) {
            return getStateUpdate(nextProps, prevState);
        }
        else {
            return { prevProps: { ...prevState.prevProps, searchCriteria } };
        }
    }
    render() {
        const { searchCriteria, columns, totalAmount } = this.props;
        let { rows, ...restProps } = this.props;
        const { showTotalOthers } = this.state;
        const OthersTotalComponent = () => (
            (searchCriteria.ReportName === constants.Management &&
                <Fragment>
                    <PaperedGrid rows={rows.filter(row => row.others)} columns={columns} title='Others' />
                    {Object.keys(totalAmount).length > 0 && <TotalPaper rows={rows} totalAmount={totalAmount} />}
                </Fragment>)
        );
        return (
            <Fragment>
                <DataGridContainer {...restProps} rows={rows.filter(row => !row.others)} checkShowTotalOthers={this.checkShowTotalOthersHandler}
                    OtherPrintComponents={OthersTotalComponent} />
                {showTotalOthers && <OthersTotalComponent />}
            </Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    let resultantProps = sharedMapStateToProps(state, ownProps);
    const { othersFetched, totalAmount, othersTotalCount } = state[ownProps.collection];
    resultantProps = { ...resultantProps, totalAmount, othersFetched, othersTotalCount };
    return resultantProps;
}
export default createContainer(ReportsGrid, mapStateToProps);


