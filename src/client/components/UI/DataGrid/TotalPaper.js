import { Grid, Table } from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import React from 'react';
const TotalPaper = ({ rows }) => {
    const columns = [{ name: 'category', title: 'Category' },{ name: 'totalPoojas', title: 'TotalPoojas' }, { name: 'amount', title: 'Amount' }]
    return (
        <Paper>
            Total
            <br/>
            <Grid rows={rows} columns={columns}>
                <Table />
            </Grid>
        </Paper>);
}
export default TotalPaper;