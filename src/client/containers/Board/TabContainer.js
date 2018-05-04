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
    height: '100%',
    marginLeft: 5,
    padding: 8 * 3,
    paddingTop: '10px',
    paddingBottom: '88px',
    marginRight: '40px',
    borderTopRightRadius: '10px,'
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
