import React from 'react';
import Input from 'material-ui/Input/Input';
import withStyles from 'material-ui/styles/withStyles';

const styles = theme => ({
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    // padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  }
});

const datePicker = (props) => {
  const { label, value, changed } = props;
  return (
    <Input
      id="date"
      label={label}
      value={value}
      onChange={changed}
      type="date"
    />
  );
}

export default withStyles(styles)(datePicker);