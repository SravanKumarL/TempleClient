import React, { Fragment } from 'react';
import PaperedGrid from './PaperedGrid';
import constants from '../../../../store/sagas/constants';
// const getCashRow = cash => {
//     const cashRowLength = cash.count;
//     const categories = [constants.totalCashAmount];
//     return [[cashRowLength, cash.value]]
//         .map((row, index) => ({ category: categories[index], total: row[0], amount: row[1] }));
// }
const getTotalRow = totalAmount => {
    const categories = [constants.totalCashAmount, constants.totalChequeAmount, constants.totalAmount]
    const chequedRowLength = totalAmount.cheque.count;
    const cashRowLength = totalAmount.cash.count;
    return [[totalAmount.cash.count, totalAmount.cash.value],
    [chequedRowLength, totalAmount.cheque.value],
    [chequedRowLength + cashRowLength, totalAmount.cheque.value + totalAmount.cash.value]]
        .map((row, index) => ({ category: categories[index], total: row[0], amount: row[1] }));
}
const TotalPaper = ({ totalAmount, cheques }) => {
    const cashAndTotalColumns = [{ name: 'category', title: 'Category' },
    { name: 'total', title: 'Total' },
    { name: 'amount', title: 'Amount' }]
    const chequeColumns = [{ name: 'chequeNo', title: 'Cheque No' },
    { name: 'bankName', title: 'Bank Name' },
    { name: 'amount', title: 'Amount' }]
    // const { cash } = totalAmount;
    return (
        <Fragment>
            {/* <PaperedGrid rows={getCashRow(cash)} columns={cashAndTotalColumns} title='Cash' /> */}
            <PaperedGrid rows={getTotalRow(totalAmount)} columns={cashAndTotalColumns}
                title='Total' showHeader={true} />
            <PaperedGrid rows={cheques} columns={chequeColumns}
                title='Cheque Details' showHeader={true} />
        </Fragment>
    );
}
export default TotalPaper;