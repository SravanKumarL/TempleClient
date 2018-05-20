import React from 'react';

import { MenuItem } from 'material-ui/Menu';

class Option extends React.Component{
  handleSelect = event => {
    if(!this.props.onOptionSelect)
      this.props.onSelect(this.props.option, event);
    else
      this.props.onOptionSelect(this.props.option, event);
  };
  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;
    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onSelect={this.handleSelect.bind(this)}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

export default Option;