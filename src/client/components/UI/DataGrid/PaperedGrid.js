import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Typography } from '@material-ui/core';
const PaperedGrid = ({ rows, columns, title, showHeader = false }) => (
    <Paper style={{ margin: '2vh 2vw' }}>
        <Typography variant='title' align='center' >
            {title}
        </Typography>
        <Grid rows={rows} columns={columns}>
            <Table />
            {showHeader && <TableHeaderRow />}
        </Grid>
    </Paper>);
export default PaperedGrid;