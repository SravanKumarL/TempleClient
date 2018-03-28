import React from 'react';
import { FormControl } from 'material-ui/Form';
import withStyles from 'material-ui/styles/withStyles';
import purple from 'material-ui/colors/purple';
import DatePickerWrapper from '../DatePicker/FlatPickrWrapper';
import Input from '../TextField/TextField';
// import Select from '../Select/Select';
import MultiSelect from '../MultiSelect/MultiSelect';
import RadioGroup from '../RadioGroup/RadioGroup';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  formControl: {
    width: '80%',
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
      />;
      break;
    case ('singleselect'):
      inputElement = <MultiSelect
        value={props.value}
        changed={props.changed}
        options={props.elementConfig.options}
        label={props.label}
        type='single'
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
        label='Payment Mode' />
      break;
    case ('multiselect'):
      inputElement = <MultiSelect
        value={props.value}
        changed={props.changed}
        label={props.label}
        type='multi'
      />
      break;
    case ('date'):
      inputElement=<DatePickerWrapper onDateSelectionChanged={props.changed}/>
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
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        {inputElement}
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(input);