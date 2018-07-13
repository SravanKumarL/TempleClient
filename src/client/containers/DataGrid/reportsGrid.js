import React, { Fragment } from 'react';
import DataGridContainer from '../../components/UI/DataGrid/DataGridContainer';
import createContainer from '../../hoc/createContainer/createContainer';
import sharedMapStateToProps from './sharedMapStateToProps';
import constants, { transactionType } from '../../../store/sagas/constants';
import PaperedGrid from '../../components/UI/DataGrid/PaperedGrid';
import TotalPaper from '../../components/UI/DataGrid/TotalPaper';
class ReportsGrid extends React.Component {
    state = {
        prevProps: {},
        transaction: null
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { searchCriteria, collection, loading } = nextProps;
        if (JSON.stringify(searchCriteria) !== JSON.stringify(prevState.prevProps.searchCriteria)) {
            prevState.fetchData(transactionType.fetch.schema, nextProps.collection, searchCriteria);
            const transaction = () => prevState.fetchData(transactionType.fetch.data, collection, searchCriteria, undefined, true);
            transaction();
            return { prevProps: { ...prevState.prevProps, searchCriteria, loading }, transaction, countFetched: false };
        }
        else if (loading !== prevState.prevProps.loading) {
            let transaction = null;
            if (nextProps.countFetched) {
                transaction = () => this.props.fetchTotal(nextProps.collection, nextProps.searchCriteria);
                transaction();
            }
            return { prevProps: { ...prevState.prevProps, loading }, transaction };
        }
        return null;
    }
    render() {
        const { rows, searchCriteria, columns, totalAmount, totalCount } = this.props;
        const showTotal = rows.filter(row => !row.others).length === totalCount;
        return (
            <Fragment>
                <DataGridContainer {...this.props} />
                <PaperedGrid rows={rows.filter(row => row.others)} columns={columns} title='Others' />
                {searchCriteria.ReportName === constants.Management && showTotal && Object.keys(totalAmount).length > 0 &&
                    <TotalPaper rows={rows} totalAmount={totalAmount} />}
            </Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    ownProps.totalAmount = state[ownProps.collection].totalAmount;
    return sharedMapStateToProps(state, ownProps);
}
export default createContainer(ReportsGrid, mapStateToProps);


