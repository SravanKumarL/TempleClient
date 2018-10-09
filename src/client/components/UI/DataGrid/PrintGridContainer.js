import React, { Fragment } from 'react';
import constants from '../../../../store/sagas/constants';
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import Typography from '@material-ui/core/Typography';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
// import { getCurrentDate } from '../../../shared/utility';
const PrintGrid = ({ rows, columns, defaultSorting }) => (
    <Grid
        rows={rows}
        columns={columns}>
        <SortingState defaultSorting={defaultSorting} />
        <IntegratedSorting />
        <Table />
        <TableHeaderRow />
    </Grid>
);
const PrintGridContainer = ({ searchCriteria, rows, columns, children, printTitle, signature, defaultSorting }) => {
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
        printColumns = printColumns.filter(column => column.name !== constants.pooja);
    }
    const PrintGridWrapped = ({ rows, columns, defaultSorting }) => (
        <Fragment>
            <PrintGrid rows={rows} columns={columns} defaultSorting={defaultSorting} />
            {children}
        </Fragment>
    )
    return (searchCriteria && searchCriteria.ReportName === constants.Pooja ?
        Object.keys(printRows).map(key =>
            (<div style={{ display: 'flex', pageBreakBefore: 'always', flexDirection: 'column', flexGrow: 1 }} key={key}>
                <Typography variant='headline' align='center' style={{ marginBottom: 20, marginTop: 20, fontWeight: 400 }}>
                    Pooja Report of {key} {printTitle}
                </Typography>
                <PrintGridWrapped rows={printRows[key]} columns={printColumns} defaultSorting={defaultSorting} />
                {signature}
            </div>)) :
        <div style={{ display: 'flex', pageBreakBefore: 'always', flexDirection: 'column', flexGrow: 1 }}>
            <Typography variant='title' align='center' style={{ marginBottom: 20, marginTop: 20, fontWeight: 400 }}>
                {searchCriteria.ReportName} Report {printTitle}
            </Typography>
            <PrintGridWrapped rows={printRows} columns={printColumns} defaultSorting={defaultSorting} />
            {signature}
        </div>
    );
}
export default PrintGridContainer;