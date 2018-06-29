import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
const PrintGrid = ({ rows, columns }) => (
    <Grid
        rows={rows}
        columns={columns}>
        <Table />
        <TableHeaderRow />
    </Grid>
);
const PrintGridContainer = ({ searchCriteria, printRows, printColumns }) => (searchCriteria && searchCriteria.ReportName === 'Pooja' ?
    Object.keys(printRows).map(key =>
        (<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} key={key}>
            <Typography variant='headline' align='center' style={{ marginBottom: 20, marginTop: 20, fontWeight: 400 }}>
                {key}
            </Typography>
            <PrintGrid rows={printRows[key]} columns={printColumns} />
        </div>)) : <PrintGrid rows={printRows} columns={printColumns} />);
export default PrintGridContainer;