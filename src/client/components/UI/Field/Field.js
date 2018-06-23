import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';
import purple from '@material-ui/core/colors/purple';
import DatePickerWrapper from '../DatePicker/FlatPickrWrapper';
import Input from '../TextField/TextField';
import RadioGroup from '../RadioGroup/RadioGroup';
import MultiSelect from '../MultiSelect/MultiSelect';
import { FIELD_TYPES } from '../../../../store/constants/transactions';

const { SINGLESELECT, MULTISELECT, NUMBER, INPUT, RADIO, DATE } = FIELD_TYPES;
const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 52,
    flexShrink: 0,
  },
  formControl: {
    width: '100%',
  },
  inputLabelFocused: {
    color: purple[500],
  },

})
const input = (props) => {
  const { elementConfig, elementType, changed, value, label, disabled, multiline, showLabels, minDate, maxDate } = props;
  let inputElement = null;
  switch (elementType) {
    case INPUT:
      inputElement = <Input
        elementConfig={elementConfig}
        value={value}
        changed={changed}
        label={label}
        disabled={disabled}
        multiline={multiline}
        showLabels={showLabels}
        type={INPUT}
      />;
      break;
    case NUMBER:
      inputElement = <Input
        elementConfig={elementConfig}
        value={value}
        changed={changed}
        label={label}
        disabled={disabled}
        type={NUMBER}
        showLabels={showLabels}
      />;
      break;
    case SINGLESELECT:
      inputElement = <MultiSelect
        value={value}
        changed={changed}
        options={elementConfig.options}
        label={label}
        type={SINGLESELECT}
        showLabels={showLabels}
      />
      break;
    case RADIO:
      inputElement = <RadioGroup
        mode={value}
        options={elementConfig.options}
        onModeSelect={changed}
        label={label} />
      break;
    case MULTISELECT:
      inputElement = <MultiSelect
        showLabels={showLabels}
        value={value}
        options={elementConfig.options}
        changed={changed}
        avoidDuplicateSelection={elementConfig.avoidDuplicateSelection}
        label={label}
        type={MULTISELECT}
      />
      break;
    case DATE:
      inputElement = <DatePickerWrapper value={value} onDateSelectionChanged={changed}
        minDate={minDate} maxDate={maxDate} />
      break;
    default:
      inputElement = <Input
        elementConfig={elementConfig}
        value={value}
        changed={changed}
        label={label}
      />;
  }
  const { classes } = props;
  return (
    <div className={classes.container} style={elementType === DATE ? { minHeight: 160 } : elementType === RADIO ? { minHeight: 100 } : null}>
      <FormControl className={classes.formControl}>
        {inputElement}
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(input);