import React from 'react';
import Typography from '@material-ui/core/Typography';
import Field from '../../../components/UI/Field/Field';
import { getCurrentDate } from '../../../shared/utility';
import { FIELD_TYPES, FIELDS } from '../../../../store/constants/transactions';
import MultiSelect from './SearchMultiSelectList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { REPORT_TYPES } from '../../../../store/constants/reports';

const { MANAGEMENT } = REPORT_TYPES;
const { DATE } = FIELD_TYPES;
const { POOJA } = FIELDS;

const ReportCriteria = (props) => {
  const selectionChangedHandler = (event, inputIdentifier) => {
    const { poojaSelected } = props;
    if (poojaSelected)
      poojaSelected(event);
  }
  const { title, dateSelectionChanged, poojas, selectedPooja, selectedDates,
    forAllUsersChangedHandler, forAllUsers } = props;
  const heading = `Select From Date and To Date to generate ${title}`;
  let pooja = null;
  if (title.trim().toLowerCase() === POOJA) {
    // const elementConfig = {
    //   options: poojas,
    //   avoidDuplicateSelection: true
    // }
    // // pooja = (
    //   <Field
    //     elementType={MULTISELECT}
    //     value={selectedPooja}
    //     elementConfig={elementConfig}
    //     changed={poojaChangedHandler}
    //     label='Pooja Name'
    //   />
    // )
    pooja = (
      <MultiSelect poojas={poojas} changed={selectionChangedHandler} selectedValues={selectedPooja} />
    )
  }
  return (
    <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
      {pooja}
      <Typography style={{ padding: 5 }} variant='subheading' align='center'>{heading}</Typography>
      <Field
        elementType={DATE}
        changed={dateSelectionChanged}
        maxDate={pooja ? undefined : getCurrentDate()}
        value={selectedDates}
        addFallBack={true}
      />
      {title === MANAGEMENT &&
        <FormControlLabel control={<Checkbox defaultChecked={false} value='true'
          onChange={forAllUsersChangedHandler} checked={forAllUsers} />}
          label='FOR ALL USERS' />}
    </div>
  );
}

export default ReportCriteria;