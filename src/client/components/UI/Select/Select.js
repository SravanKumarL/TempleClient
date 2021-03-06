import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '2px 10px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const select = (props) => {
  const { value, changed, options, classes } = props;
  return (
    <Select
      className={classes.textFieldInput}
      value={value}
      onChange={changed}
      disableUnderline
      MenuProps={MenuProps}
    >
      {options.map(option => (
        <MenuItem
          key={option.value}
          value={option.value}>
          {option.value}
        </MenuItem>
      ))}
    </Select>
  );
}

export default withStyles(styles)(select);