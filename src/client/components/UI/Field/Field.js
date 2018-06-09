import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';
import purple from '@material-ui/core/colors/purple';
import DatePickerWrapper from '../DatePicker/FlatPickrWrapper';
import Input from '../TextField/TextField';
// import Select from '../Select/Select';
import MultiSelect from '../MultiSelect/MultiSelect';
import RadioGroup from '../RadioGroup/RadioGroup';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 60,
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
  let inputElement = null;
  switch (props.elementType) {
    case ('input'):
      inputElement = <Input
        elementConfig={props.elementConfig}
        value={props.value}
        changed={props.changed}
        label={props.label}
        disabled={props.disabled}
        multiline={props.multiline}
        showLabels={props.showLabels}
      />;
      break;
    case ('number'):
      inputElement = <Input
        elementConfig={props.elementConfig}
        value={props.value}
        changed={props.changed}
        label={props.label}
        disabled={props.disabled}
        type='number'
        showLabels={props.showLabels}
      />;
      break;
    case ('singleselect'):
      inputElement = <MultiSelect
        value={props.value}
        changed={props.changed}
        options={props.elementConfig.options}
        label={props.label}
        type='single'
        showLabels={props.showLabels}
      />
      break;
    case ('label'):
      inputElement = <Input
        value={props.value}
        options={props.elementConfig.options}
        label={props.label}
      />
      break;
    case ('radioGroup'):
      inputElement = <RadioGroup
        mode={props.value}
        options={props.elementConfig.options}
        onModeSelect={props.changed}
        label={props.label} />
      break;
    case ('multiselect'):
      inputElement = <MultiSelect
        showLabels={props.showLabels}
        value={props.value}
        changed={props.changed}
        label={props.label}
        type='multi'
      />
      break;
    case ('date'):
      inputElement = <DatePickerWrapper value={props.value} onDateSelectionChanged={props.changed}
        minDate={props.minDate} maxDate={props.maxDate} />
      break;
    default:
      inputElement = <Input
        elementConfig={props.elementConfig}
        value={props.value}
        changed={props.changed}
        label={props.label}
      />;
  }
  const { classes } = props;
  return (
    <div className={classes.container} style={props.elementType === 'date' ? { minHeight: 140 } : props.elementType === 'radioGroup' ? { minHeight: 88 } : null}>
      <FormControl className={classes.formControl}>
        {inputElement}
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(input);