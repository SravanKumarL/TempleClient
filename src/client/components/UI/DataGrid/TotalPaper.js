import React from 'react';
import PaperedGrid from './PaperedGrid';
import constants from '../../../../store/sagas/constants';
const getTotalRows = (rows, totalAmount) => {
    const rowLength = rows.length;
    const chequedRowLength = rows.filter(row => row.chequeNo).length;
    const cashRowLength = rowLength - chequedRowLength;
    const categories = [constants.totalCashAmount, constants.totalChequeAmount, constants.totalAmount];
    return [[cashRowLength, totalAmount.cash], [chequedRowLength, totalAmount.cheque], [rowLength, totalAmount.cheque + totalAmount.cash]]
        .map((row, index) => ({ category: categories[index], totalPoojas: row[0], amount: row[1] }));
}
const TotalPaper = ({ rows, totalAmount }) => {
    const columns = [{ name: 'category', title: 'Category' }, { name: 'totalPoojas', title: 'TotalPoojas' }, { name: 'amount', title: 'Amount' }]
    return (<PaperedGrid rows={getTotalRows(rows, totalAmount)} columns={columns} title='Total' />);
}
export default TotalPaper;