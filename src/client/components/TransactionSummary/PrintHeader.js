import React from 'react';
import Logo from '../../../assets/logo.svg';
import { Typography } from '@material-ui/core';
export default class PrintHeader extends React.PureComponent {
  render() {
    return (
      <div style={{ ...this.props.style }} id={this.props.id}>
        <div style={{ display: 'flex' }}>
          <img src={Logo} style={{ height: 90, width: 90 }} alt='Logo' />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography style={{color: 'black'}} variant='title' align='center'>
              Sri Sringeri Jagadguru Mahasamsthanam
           </Typography>
            <Typography style={{color: 'black'}} variant='body2' align='center'>
              Sri Sringeri Shankara Math, Nallakunta, Hyderabad - 44 (T.S.)
           </Typography>
            <Typography style={{color: 'black'}} variant='caption' align='center'>
              Tel: 040-27677783
           </Typography>
          </div>
        </div>
      </div>
    );
  }
}

