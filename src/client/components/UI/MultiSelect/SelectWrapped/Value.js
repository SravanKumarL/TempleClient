import React from 'react';

import Chip from 'material-ui/Chip';

const value = valueProps => {
  const { value, children, onRemove, classes } = valueProps;

  if (onRemove) {
    return (
      <Chip
        tabIndex={-1}
        label={children}
        className={classes.chip}
        onDelete={event => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        }}
      />
    );
  }

return (<div className="Select-value">{children}</div>);
}

export default value;