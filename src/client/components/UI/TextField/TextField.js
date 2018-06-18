import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';
import { FIELD_TYPES } from '../../../../store/constants/transactions';

const { INPUT } = FIELD_TYPES;
const styles = theme => ({
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
    height: 'auto',
  },
  textFieldInput: {
    color: 'initial',
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: '1rem',
    padding: '0.7rem 0.8rem',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  textFieldFormLabel: {
    fontSize: 18,
  },
});

const TextBox = ({ type, classes, label, value, changed, disabled, multiline, showLabels }) => {
  return (
    <TextField
      label={showLabels ? label : ''}
      placeholder={showLabels ? '' : label}
      InputProps={{
        disableUnderline: true,
        classes: {
          root: classes.textFieldRoot,
          input: classes.textFieldInput,
        },
      }}
      InputLabelProps={showLabels ? {
        shrink: true,
        className: classes.textFieldFormLabel,
      } : {}}
      value={value}
      onChange={changed}
      disabled={disabled}
      type={type ? type : INPUT}
      multiline={multiline}
      rows={2}
    />
  );
}

TextBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextBox);