import React from 'react';

import Typography from 'material-ui/Typography';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp';
import ClearIcon from 'material-ui-icons/Clear';
import Chip from 'material-ui/Chip';
import Select from 'react-select';

import Option from '../Option/Option';

const SelectWrapped = (props) => {
  const { classes, removeChip, onChange, onClearAll, ...other } = props;
  const handleSelect = (change) => {
    if (change === '' && !this.valueSelected) {
      this.valueSelected = false;
      onClearAll();
    }
    else {
      this.valueSelected = false;
      onChange(change);
    }
  }
  const onValueClickHandler = () => this.valueSelected = true;
  const onInputKeyDownHandler = (event) => this.valueSelected = event.keyCode === 13;

  // const { classes, ...other } = props;
  const value = valueProps => {
    // const { value, children, onRemove } = valueProps;
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
      optionComponent={props => (<Option onValueClick={onValueClickHandler.bind(this)} {...props} />)}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      simpleValue
      onChange={handleSelect.bind(this)}
      onInputKeyDown={onInputKeyDownHandler.bind(this)}
      // onSelectResetsInput
      removeSelected={false}
      clearRenderer={() => <ClearIcon />}
      valueComponent={value}
      {...other}
    />
  );
}

export default SelectWrapped;