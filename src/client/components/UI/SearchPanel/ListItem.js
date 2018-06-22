import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/ModeEdit';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { SEARCH_OPERATIONS } from '../../../../store/constants/transactions';

const { USE, EDIT } = SEARCH_OPERATIONS;

const styles = theme => ({
  showIconButton: {
    height: 40,
    opacity: 1,
    transition: 'all 0.2s ease-in-out',
  },
  hideIconButton: {
    height: 40,
    opacity: 0,
    transition: 'all 0.2s ease-in-out',
  },
  listItem: {
    paddingTop: '6px',
    paddingBottom: '6px',
    paddingLeft: 0,
    '&:hover': {
      backgroundColor: 'initial', 
    }
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    height: 50,
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      textDecoration: 'none',
    }
  }
});

class CustomListItem extends React.Component {
  state = {
    showIcon: false
  }
  toggleIconButton = (showHide) => { this.setState({ showIcon: showHide }) };
  render() {
    const { transaction, classes } = this.props;
    return (
      <div className={classes.container} onMouseOver={() => this.toggleIconButton(true)} onMouseOut={() => this.toggleIconButton(false)}>
        <ListItem onClick={() => this.props.optionClicked(USE, transaction)} className={classes.listItem} button disableRipple>
          <ListItemText inset primary={transaction.names} />
        </ListItem>
        <IconButton onClick={() => this.props.optionClicked(EDIT, transaction)} className={this.state.showIcon ? classes.showIconButton : classes.hideIconButton}>
          <Edit />
        </IconButton>
      </div>
    )
  }
}

export default withStyles(styles)(CustomListItem)