import React from 'react';
import Typography from 'material-ui/Typography';

const textLabel = props => {
  return (
    <div style={{ display: 'flex' }}>
      <Typography style={{ fontWeight: 'bold', marginLeft: '40px' }} gutterBottom align={props.align} type={props.type}>
        {props.label}:
      </Typography>
      <Typography style={{ marginLeft: '20px', fontWeight: 'bold' }} gutterBottom align={props.align} type={props.type}>
        {props.value}
      </Typography>
    </div>

  );
}

export default textLabel;