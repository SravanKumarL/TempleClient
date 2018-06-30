import { Grid, Table } from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import createContainer from '../../../hoc/createContainer/createContainer';
import { getFormattedColumns } from '../../../shared/utility';
class OthersPaper extends React.PureComponent {
    state = {
        toFetchOthers: false
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.toFetchOthers !== undefined && nextProps.toFetchOthers !== prevState.toFetchOthers) {
            if (nextProps.toFetchOthers) {
                const { fetchEntityData, collection, searchCriteria } = nextProps;
                const transaction = () => fetchEntityData(collection, searchCriteria, {}, true, false, true, true);
                transaction();
                nextProps.onFetchOthers(transaction);
            }
            return { toFetchOthers: nextProps.toFetchOthers };
        }
        return null;
    }
    render() {
        const { rows, columns } = this.props;
        return (this.state.toFetchOthers ?
            <Paper>
                Others
                <br />
                <Grid rows={rows} columns={columns}>
                    <Table />
                </Grid>
            </Paper> : null);
    }
}
const mapStateToProps = (state, ownProps) => ({
    collection: ownProps.collection,
    searchCriteria: ownProps.searchCriteria,
    onFetchOthers: ownProps.onFetchOthers,
    toFetchOthers: ownProps.toFetchOthers,
    columns: getFormattedColumns(state.reports.columns),
    rows: state.reports.rows.filter(row => row.others),
    othersTotalCount: state.reports.othersTotalCount,
})
export default createContainer(OthersPaper, mapStateToProps);