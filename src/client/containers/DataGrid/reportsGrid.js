import React, { Fragment } from 'react';
import DataGridContainer from '../../components/UI/DataGrid/DataGridContainer';
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
            showTotalOthers: false
        }
        this.checkShowTotalOthersHandler = this.checkShowTotalOthersHandler.bind(this);
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
                <PaperedGrid rows={rows.filter(row => row.others)} columns={columns} title='Others' />
                {searchCriteria.ReportName === constants.Management && showTotalOthers && Object.keys(totalAmount).length > 0 &&
                    <TotalPaper rows={rows} totalAmount={totalAmount} />}
            </Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    let resultantProps = sharedMapStateToProps(state, ownProps);
    resultantProps.totalAmount = state[ownProps.collection].totalAmount;
    return resultantProps;
}
export default createContainer(ReportsGrid, mapStateToProps);


