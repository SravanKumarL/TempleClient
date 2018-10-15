import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '../../components/UI/Dialog/Dialog';
import PrintHeader from './PrintHeader';
import { Typography } from '@material-ui/core';
import { getCurrentDate } from '../../shared/utility';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    boxShadow: theme.shadows[3],
    border: `1px solid ${theme.palette.grey[200]}`,
  },
});

class transactionSummary extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDownHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDownHandler);
  }
  keyDownHandler = (event) => {
    if (event.altKey) {
      event.keyCode === 88 && this.props.print();
      event.keyCode === 67 && this.props.summaryClosed();
    }
  }
  render() {
    const { classes, open, modifiedBy, transactionFields, summaryClosed, print, isPrinted } = this.props;
    const createdDate = transactionFields.filter(id => id.name.toLowerCase() === 'created date' && id)[0];
    const createdBy = transactionFields.filter(id => id.name.toLowerCase() === 'created by' && id)[0];
    // const createdDate = '27-08-18';
    // const createdBy = 'admin';
    const capitalizedFields = ['Names', 'Gothram', 'Nakshatram', 'Pooja', 'Payment Mode', 'Bank Name'];
    return (
      <Dialog
        open={open}
        primaryClicked={print}
        primaryText={isPrinted ? 'Print Duplicate' : 'Save & Print'}
        secondaryText={isPrinted ? 'Close' : 'Cancel'}
        secondaryClicked={summaryClosed}
        cancelled={summaryClosed}
        maxWidth='xs'
        title='Transaction Summary'>
        <div id='transactionSummary'>
          <PrintHeader style={{ marginTop: 5 }} id='printHeader' />
          <div style={{ border: '1px solid #cad0d7', width: '100%', maxWidth: 360, marginTop: 10 }} id='printTable' className={classes.table}>
            <div>
              {Object.keys(transactionFields).map(id => {
                const field = transactionFields[id];
                if (['Created By', 'Created Date', 'Selected Dates', 'Id'].includes(field.name)) {
                  return null;
                }
                // if (field.name.toLowerCase() === 'dates') {
                //   let newDateArray = field.value.split(',');
                //   newDateArray = newDateArray.map(date => getFormattedDate(date));
                //   field.value = newDateArray.join(',');
                // }
                const placeholder = field.name;
                const value = capitalizedFields.includes(field.name) ? field.value.toUpperCase() : field.value;
                const maxHeight = placeholder === 'Dates' ? 100 : 75;
                const customFontSize = placeholder === 'Amount' ? 20 : 16;
                const customFontWeight = placeholder === 'Amount' ? 'bold' : 'inherit';
                return (
                  <div style={{ display: 'flex', color: 'black', borderBottom: '1px solid #cad0d7' }} key={id}>
                    <div style={{ width: '110px', color: 'black', fontSize: 14, margin: 10, borderLeft: '1px solid $cad0d7' }} >{placeholder}</div>
                    <div style={{ whiteSpace: 'pre-wrap', color: 'black', width: '210px', fontSize: customFontSize, fontWeight: customFontWeight, margin: '10px 0px', wordWrap: 'break-word', maxHeight, overflow: 'hidden' }}>{placeholder === 'Amount' ? `₹ ${value}` : value} </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ marginTop: '30px', display: 'flex', alignItems: 'flex-end', flexDirection: 'column', paddingRight: '10px' }}>
            <Typography style={{ padding: 5, color: 'black', fontWeight: 'bold' }} variant='caption'>Created By: {createdBy && createdBy.value}   </Typography>
            <Typography style={{ padding: 5, color: 'black', fontWeight: 'bold' }} variant='caption'>Created On: {createdDate && createdDate.value}   </Typography>
            {modifiedBy ?
              <Fragment>
                <Typography style={{ padding: 5, color: 'black', fontWeight: 'bold' }} variant='caption'>Modified By: {modifiedBy} </Typography>
                <Typography style={{ padding: 5, color: 'black', fontWeight: 'bold' }} variant='caption'>Modified On: {getCurrentDate()}   </Typography>
              </Fragment>
              : null
            }
          </div>
        </div>
      </Dialog>
    )
  }
}

export default withStyles(styles)(transactionSummary);