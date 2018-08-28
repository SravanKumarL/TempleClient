import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '../../components/UI/Dialog/Dialog';
import PrintHeader from './PrintHeader';
import { getCurrentDate } from '../../shared/utility';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    boxShadow: theme.shadows[3],
    border: `1px solid ${theme.palette.grey[200]}`,
  },
});

const currentDate = getCurrentDate().toString();
const transactionSummary = ({ classes, open, modifiedBy, transactionFields, summaryClosed, print }) => {
  const createdDate = transactionFields.filter(id => id.name.toLowerCase() === 'created date' && id)[0];
  const createdBy = transactionFields.filter(id => id.name.toLowerCase() === 'created by' && id)[0];
  // const createdDate = '27-08-18';
  // const createdBy = 'admin';
  const capitalizedFields = ['Names', 'Gothram', 'Nakshatram', 'Pooja', 'Payment Mode', 'Bank Name'];
  return (
    <Dialog
      open={open}
      primaryClicked={print}
      primaryText='Save & Print'
      secondaryText='Cancel'
      secondaryClicked={summaryClosed}
      cancelled={summaryClosed}
      maxWidth='xs'
      title='Transaction Summary'>
      <div id='transactionSummary'>
        <PrintHeader style={{ marginTop: 30 }} id='printHeader' />
        <div style={{ border: '1px solid #cad0d7', width: '100%', maxWidth: 360, marginTop: 30 }} id='printTable' className={classes.table}>
          <div>
            {Object.keys(transactionFields).map(id => {
              const field = transactionFields[id];
              if (['Special Offerings', 'Created By', 'Created Date'].includes(field.name)) {
                return null;
              }
              const placeholder = field.name;
              const value = capitalizedFields.includes(field.name) ? field.value.toUpperCase() : field.value;
              return (
                <div style={{ display: 'flex', borderBottom: '1px solid #cad0d7' }} key={id}>
                  <div style={{ width: '110px', fontSize: 14, margin: 10, borderLeft: '1px solid $cad0d7' }} >{placeholder}   :</div>
                  <div style={{ whiteSpace: 'pre-wrap', width: '210px', fontSize: 16, margin: '10px 0px', wordWrap: 'break-word', maxHeight: 75, overflow: 'hidden' }}>{value}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ marginTop: '100px', display: 'flex', alignItems: 'flex-end', flexDirection: 'column', paddingRight: '10px' }}>
          <Typography style={{ padding: 5, fontWeight: 'bold' }} variant='caption'>Created By: {createdBy && createdBy.value}   </Typography>
          <Typography style={{ padding: 5, fontWeight: 'bold' }} variant='caption'>Created On: {createdDate && createdDate.value}   </Typography>
          {currentDate !== createdDate.value.toString() ?
            <Fragment>
              <Typography style={{ padding: 5, fontWeight: 'bold' }} variant='caption'>Modified On: {getCurrentDate()}   </Typography>
              <Typography style={{ padding: 5, fontWeight: 'bold' }} variant='caption'>Modified By: {modifiedBy} </Typography>
            </Fragment>
            : null
          }
        </div>
      </div>
    </Dialog>
  )
};

export default withStyles(styles)(transactionSummary);