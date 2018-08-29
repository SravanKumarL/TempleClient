import React from 'react';
import PaperedGrid from './PaperedGrid';
import constants from '../../../../store/sagas/constants';
const getTotalRows = (totalAmount) => {
    const chequedRowLength = totalAmount.cheque.count;
    const cashRowLength = totalAmount.cash.count;
    const rowLength = chequedRowLength + cashRowLength;
    const categories = [constants.totalCashAmount, constants.totalChequeAmount, constants.totalAmount];
    return [[cashRowLength, totalAmount.cash.value], [chequedRowLength, totalAmount.cheque.value], [rowLength, totalAmount.cheque.value + totalAmount.cash.value]]
        .map((row, index) => ({ category: categories[index], totalPoojas: row[0], amount: row[1] }));
}
const TotalPaper = ({ totalAmount }) => {
    const columns = [{ name: 'category', title: 'Category' }, { name: 'totalPoojas', title: 'TotalPoojas' }, { name: 'amount', title: 'Amount' }]
    return (<PaperedGrid rows={getTotalRows(totalAmount)} columns={columns} title='Total' />);
}
export default TotalPaper;