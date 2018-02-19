import React from 'react';
import Input from '../TextField/TextField';
import Select from '../Select/Select';
// import Aux from '../../../hoc/Wrapper/Wrapper';
import MultiSelect from '../MultiSelect/MultiSelect';
// import DatePicker from '../DatePicker/DatePicker';
// import Label from '../Label/Label';
import { FormControl } from 'material-ui/Form';
// import { InputLabel } from 'material-ui/Input';
import withStyles from 'material-ui/styles/withStyles';
import purple from 'material-ui/colors/purple';

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
    case ('select'):
      inputElement = <Select
        value={props.value}
        changed={props.changed}
        options={props.elementConfig.options}
        label={props.label}
      />
      break;
    case ('label'):
      inputElement = <Input
        value={props.value}
        options={props.elementConfig.options}
        label={props.label}
      />
      break;
    case ('multiselect'):
      inputElement = <MultiSelect
        value={props.value}
        changed={props.changed}
        label={props.label}
      />
      break;
    case ('date'):
      inputElement = <Input
        value={props.value}
        changed={props.changed}
        label={props.label}
        type='date'
      />
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
        {/* <InputLabel
          FormControlClasses={{
            focused: classes.inputLabelFocused,
          }}
          htmlFor="custom-color-input"
        >
          {props.label}
        </InputLabel> */}
        {inputElement}
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(input);