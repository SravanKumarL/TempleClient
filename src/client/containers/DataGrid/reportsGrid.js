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
            fetchData: props => handleFetchData(props)
        }
        this.checkShowTotalOthersHandler = this.checkShowTotalOthersHandler.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { searchCriteria, collection, loading, rows } = nextProps;
        if (prevState.prevProps.searchCriteria) {
            if (JSON.stringify(searchCriteria) !== JSON.stringify(prevState.prevProps.searchCriteria)) {
                prevState.fetchData(nextProps)(transactionType.fetch.schema, nextProps.collection, searchCriteria);
                const transaction = () => prevState.fetchData(nextProps)(transactionType.fetch.data, collection, searchCriteria);
                transaction();
                return { prevProps: { ...prevState.prevProps, searchCriteria, loading }, transaction, showTotalOthers: false };
            }
            else if (loading !== prevState.prevProps.loading) {
                let transaction = null;
                if (nextProps.countFetched && searchCriteria.ReportName === constants.Management && !nextProps.othersFetched) {
                    nextProps.fetchEntityData(collection, searchCriteria, {}, true);
                    transaction = () => nextProps.fetchTotal(collection, searchCriteria);
                    transaction();
                }
                return { prevProps: { ...prevState.prevProps, loading }, transaction };
            }
            else if (nextProps.othersFetched && (rows.length === nextProps.totalCount + nextProps.othersTotalCount)) {
                return { showTotalOthers: true }
            }
            return null;
        }
        else
            return { prevProps: { ...prevState.prevProps, searchCriteria } };
    }
    checkShowTotalOthersHandler = (currentPage, pageSize) => {
        const lastPageNumber = Math.ceil(this.props.rows.length / pageSize);
        let showTotalOthers = false;
        showTotalOthers = pageSize >= this.props.rows.length;
        if (!showTotalOthers && currentPage) {
            showTotalOthers = currentPage === lastPageNumber;
        }
        if (showTotalOthers)
            this.setState({ showTotalOthers });
    }
    render() {
        const { rows, searchCriteria, columns, totalAmount } = this.props;
        const { showTotalOthers } = this.state;
        return (
            <Fragment>
                <DataGridContainer {...this.props} checkShowTotalOthers={this.checkShowTotalOthersHandler} />
                {searchCriteria.ReportName === constants.Management && showTotalOthers &&
                    <Fragment>
                        <PaperedGrid rows={rows.filter(row => row.others)} columns={columns} title='Others' />
                        {Object.keys(totalAmount).length > 0 && <TotalPaper rows={rows} totalAmount={totalAmount} />}
                    </Fragment>}
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


