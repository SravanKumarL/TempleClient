import React from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
const PrintGrid = ({ rows, columns }) => (
    <Grid
        rows={rows}
        columns={columns}>
        <Table />
        <TableHeaderRow />
    </Grid>
);
export default PrintGrid;