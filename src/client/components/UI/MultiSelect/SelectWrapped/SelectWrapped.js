import React from 'react';

import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Select from 'react-select';
import Option from '../Option/Option';
import { withStyles } from '@material-ui/core/styles';
const chipStyles = {
  chip: {
    'zIndex': 2
  }
}
const SelectWrapped = (props) => {
  const { classes, removeChip, onChange, onClearAll, ...other } = props;
  const handleSelect = (change) => {
    if (change === '' && !this.valueSelected) {
      this.valueSelected = false;
      this.deleteSelected = false;
      onClearAll();
    }
    else if (this.deleteSelected) {
      this.deleteSelected = false;
      onChange(change, true);
    }
    else {
      this.valueSelected = false;
      onChange(change);
    }
  }
  const onValueClickHandler = () => this.valueSelected = true;
  const onInputKeyDownHandler = (event) => {
    this.valueSelected = event.keyCode === 13;
    this.deleteSelected = event.keyCode === 46 || event.keyCode === 8;
  }
  class OptionComponent extends React.Component {
    render() {
      return <Option onValueClick={onValueClickHandler} {...this.props} />
    }
  }
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
      const StyledChip = withStyles(chipStyles)(({ classes }) =>
        (<Chip classes={{ root: classes.chip }}
          tabIndex={-1}
          label={label}
          // className={classes.chip}
          onDelete={valueRemove}
        />));
      return <StyledChip />;
    }
    return <div className="Select-value">{label}</div>;
  }
  return (
    <Select
      optionComponent={OptionComponent}
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