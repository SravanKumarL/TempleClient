import React from 'react';
import Typography from 'material-ui/Typography';
import Fade from 'material-ui/transitions/Fade';
import PropTypes from 'prop-types';

const tabContainer = ({ children }) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    color: 'black',
    marginLeft: 5,
    borderTopRightRadius: '10px',
    margin: '0 10px',
    flexGrow: 1,
  };
  return (
    <Typography component="div" style={style}>
      <Fade in={true} timeout={500} mountOnEnter unmountOnExit>
        {children}
      </Fade>
    </Typography >
  );
}

tabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default tabContainer;
