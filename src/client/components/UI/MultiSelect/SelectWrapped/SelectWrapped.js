import React from 'react';

import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Select from 'react-select';

import Option from '../Option/Option';

const selectWrapped = (props) => {
  const handleClear = (change) => {
    props.onClearAll();
  }
  const onOptionSelected = (value, event) => {
    props.onChange(value.value);
  }
  const { classes, removeChip, onChange, ...other } = props;
  const value = valueProps => {
    let { value } = valueProps;
    let label = value;
    if (value.value)
      label = value.value;
    const valueRemove = event => {
      event.preventDefault();
      event.stopPropagation();
      removeChip(value);
    };
    if (removeChip) {
      return (
        <Chip
          tabIndex={-1}
          label={label}
          className={classes.chip}
          onDelete={valueRemove}
        />
      );
    }
    return <div className="Select-value">{label}</div>;
  }
  return (
    <Select
      optionComponent={(props) => {
        const { ref, ...restProps } = props;
        return <Option id='select-option' onOptionSelect={onOptionSelected} {...restProps} />;
      }}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      simpleValue
      onChange={handleClear}
      removeSelected={false}
      clearRenderer={() => <ClearIcon />}
      valueComponent={value}
      {...other}
    />
  );
}
export default selectWrapped;