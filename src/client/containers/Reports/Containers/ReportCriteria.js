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
    pooja = (
      <Field
        elementType='multiselect'
        value={selectedPooja}
        changed={poojaChangedHandler}
        options={poojas}
        avoidDuplicateSelection={true}
        label='Pooja Name'
      />
    )
  }
  return (
    <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
      <Typography variant='subheading' align='center'>{heading}</Typography>
      {pooja}
      <Field
        elementType='date'
        changed={dateSelectionChanged}
        maxDate={pooja ? undefined : getCurrentDate()}
        value={selectedDates}
      />
    </div>
  );
}

export default ReportCriteria;