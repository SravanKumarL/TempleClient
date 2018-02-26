import React from 'react';

import Typography from 'material-ui/Typography';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp';
import ClearIcon from 'material-ui-icons/Clear';
import Chip from 'material-ui/Chip';
import Select from 'react-select';

import Option from '../Option/Option';

const selectWrapped = (props) => {
  const { classes, ...other } = props;
  const value = valueProps => {
    const { value, children, onRemove } = valueProps;
    const valueRemove = event => {
      event.preventDefault();
      event.stopPropagation();
      onRemove(value);
    };
    if (onRemove) {
      return (
        <Chip
          tabIndex={-1}
          label={children}
          className={classes.chip}
          onDelete={valueRemove}
        />
      );
    }
    return <div className="Select-value">{children}</div>;
  }
  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      simpleValue
      removeSelected={false}
      clearRenderer={() => <ClearIcon />}
      valueComponent={value}
      {...other}
    />
  );
}

export default selectWrapped;