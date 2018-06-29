import { Grid, Table } from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import createContainer from '../../../hoc/createContainer/createContainer';
class OthersPaper extends React.PureComponent {
    componentDidMount() {
        if (this.props.toFetchOthers) {
            this.props.onFetchOthers();
        }
    }
    static getDerivedStateFromProps() {

    }
    render() {
        const { rows, columns } = this.props;
        return (rows.length > 0 && columns.length > 0 &&
            <Paper>
                Others
                <br />
                <Grid rows={rows.filter(row => row.others)} columns={columns}>
                    <Table />
                </Grid>
            </Paper>);
    }
}
const mapStateToProps = (state, ownProps) => ({
    toFetchOthers:ownProps.toFetchOthers,
    columns: ownProps.columns,
    rows: state.reports.rows,
    totalCount: state.reports.totalCount,
})
export default createContainer(OthersPaper, mapStateToProps);