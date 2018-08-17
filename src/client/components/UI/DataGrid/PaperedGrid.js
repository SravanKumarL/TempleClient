import { Grid, Table } from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import React from 'react';
const PaperedGrid = ({ rows, columns, title }) => (
    <Paper style={{ margin: '0px 35px' }}>
        <div>
            {title}
        </div>
        <Grid rows={rows} columns={columns}>
            <Table />
        </Grid>
    </Paper>);
export default PaperedGrid;