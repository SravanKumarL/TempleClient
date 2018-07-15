import React, { Fragment } from 'react';
import constants from '../../../../store/sagas/constants';
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
const PrintGridContainer = ({ searchCriteria, rows, columns, children }) => {
    let pooja = '';
    let printRows = [...rows];
    let printColumns = [...columns];
    if (searchCriteria && searchCriteria.ReportName === constants.Pooja) {
        if (rows.length > 0) {
            printRows = printRows.reduce((accumulator, currValue) => {
                pooja = accumulator[currValue.pooja];
                accumulator[currValue.pooja] = [...(pooja || []), currValue];
                return accumulator;
            }, {});
        }
        printColumns = printColumns.filter(column => column.name !== 'pooja');
    }
    const PrintGridWrapped = ({ rows, columns }) => (
        <Fragment>
            <PrintGrid rows={rows} columns={columns} />
            {children}
        </Fragment>
    )
    return (searchCriteria && searchCriteria.ReportName === 'Pooja' ?
        Object.keys(printRows).map(key =>
            (<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} key={key}>
                <Typography variant='headline' align='center' style={{ marginBottom: 20, marginTop: 20, fontWeight: 400 }}>
                    {key}
                </Typography>
                <PrintGridWrapped rows={printRows[key]} columns={printColumns} />
            </div>)) : <PrintGridWrapped rows={printRows} columns={printColumns} />);
}
export default PrintGridContainer;