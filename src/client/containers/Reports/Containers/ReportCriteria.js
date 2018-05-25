import React from 'react';
import Typography from '@material-ui/core/Typography';
import Field from '../../../components/UI/Field/Field';
import { getCurrentDate } from '../../../shared/utility';

const ReportCriteria = (props) => {
  const poojaChangedHandler = (event, inputIdentifier) => {
    const { poojaSelected } = props;
    if (poojaSelected)
      poojaSelected(event);
  }
  const { title, dateSelectionChanged, poojas, selectedPooja, selectedDates } = props;
  const heading = `Select From Date and To Date to generate ${title}`;
  let pooja = null;
  if (title.trim().toLowerCase() === 'pooja report') {
    const elementConfig = {
      options: poojas
    }
    pooja = (
      <Field
        elementType='singleselect'
        value={selectedPooja}
        changed={poojaChangedHandler}
        elementConfig={elementConfig}
        label='Pooja Name'
      />
    )
  }
  return (
    <div style={{ display: 'flex', width: 450, flexGrow: 1, flexDirection: 'column' }}>
      <Typography variant='subheading' align='center'>{heading}</Typography>
      {pooja}
      <Field
        elementType='date'
        changed={dateSelectionChanged}
        maxDate={getCurrentDate()}
        value={selectedDates}
      />
    </div>
  );
}

export default ReportCriteria;