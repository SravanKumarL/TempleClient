import React from 'react'
import { Paper } from 'material-ui';
import withStyles from 'material-ui/styles/withStyles'
import { FilteringState, IntegratedPaging, IntegratedFiltering, PagingState, EditingState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableEditColumn, TableFilterRow, PagingPanel, DragDropProvider } from '@devexpress/dx-react-grid-material-ui';
import Loading from '../Progress/progress';
const onCommitChanges = () => { };
const styles=theme=>({
    grid:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative' 
    }
});
const LoadingGrid = ({ columns, error, classes }) => (
    <div className={classes.grid}>
        <Paper>
            <Grid rows={[]} columns={columns}>
                <FilteringState />
                <EditingState onCommitChanges={onCommitChanges} />
                <DragDropProvider />
                <PagingState currentPage={0} pageSize={0} />
                <Table />
                <TableEditColumn width={120} showAddCommand={true} />
                <TableFilterRow />
                <TableHeaderRow />
                <PagingPanel pageSizes={[0, 5, 10]} />
                <IntegratedFiltering />
                <IntegratedPaging />
            </Grid>
        </Paper>
        <Loading />
    </div>
);
export default withStyles(styles)(LoadingGrid);