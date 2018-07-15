import React, { Fragment } from 'react';
import DataGridContainer, { handleFetchData } from '../../components/UI/DataGrid/DataGridContainer';
import createContainer from '../../hoc/createContainer/createContainer';
import sharedMapStateToProps from './sharedMapStateToProps';
import constants, { transactionType } from '../../../store/sagas/constants';
import PaperedGrid from '../../components/UI/DataGrid/PaperedGrid';
import TotalPaper from '../../components/UI/DataGrid/TotalPaper';
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
    static getDerivedStateFromProps(nextProps, prevState) {
        const { searchCriteria, collection, loading } = nextProps;
        if (prevState.prevProps.searchCriteria) {
            if (JSON.stringify(searchCriteria) !== JSON.stringify(prevState.prevProps.searchCriteria)) {
                prevState.fetchData(nextProps)(transactionType.fetch.schema, nextProps.collection, searchCriteria);
                const transaction = () => prevState.fetchData(nextProps)(transactionType.fetch.data, collection, searchCriteria);
                transaction();
                return {
                    prevProps: { ...prevState.prevProps, searchCriteria, loading }, transaction,
                    showTotalOthers: false, othersFetchReq: false
                };
            }
            else if (loading !== prevState.prevProps.loading) {
                let transaction = null;
                let othersFetchReq = false;
                if (nextProps.countFetched && searchCriteria.ReportName === constants.Management && !prevState.othersFetchReq) {
                    othersFetchReq = true;
                    nextProps.fetchEntityData(collection, searchCriteria, {}, true);
                    transaction = () => nextProps.fetchTotal(collection, searchCriteria);
                    transaction();
                }
                return { prevProps: { ...prevState.prevProps, loading }, transaction, othersFetchReq };
            }
            else if (nextProps.othersFetched && (constants.minimumPageSize >= nextProps.totalCount)) {
                return { showTotalOthers: true }
            }
            return null;
        }
        else
            return { prevProps: { ...prevState.prevProps, searchCriteria } };
    }
    checkShowTotalOthersHandler = (currentPage, pageSize) => {
        const rows = this.props.rows.filter(row => !row.others);
        const lastPageNumber = Math.floor(rows.length / pageSize);
        let showTotalOthers = false;
        showTotalOthers = pageSize >= rows.length;
        if (!showTotalOthers && currentPage) {
            showTotalOthers = currentPage === lastPageNumber;
        }
        this.setState({ showTotalOthers });
    }
    render() {
        const { rows, searchCriteria, columns, totalAmount } = this.props;
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
                <DataGridContainer {...this.props} checkShowTotalOthers={this.checkShowTotalOthersHandler}
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


