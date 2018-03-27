import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'material-ui/styles/withStyles';
import IconButton from 'material-ui/IconButton';
import Input, { InputAdornment } from 'material-ui/Input';
import Search from 'material-ui-icons/Search';
import Popup from './PopupMenu';
import { Clear } from 'material-ui-icons';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Slide from 'material-ui/transitions/Slide';
import green from 'material-ui/colors/green';
import Typography from 'material-ui/Typography';
import CircularProgress from 'material-ui/Progress/CircularProgress';


const styles = theme => ({
  root: {
    display: 'flex',
    padding: 5,
  },
  formControl: {
    display: 'flex',
    margin: theme.spacing.unit * 3,
  },
  checked: {
    color: green[500],
  },
  group: {
    flexDirection: 'row',
    margin: `${theme.spacing.unit}px 0`,
  },
  panel: {
    display: 'flex',
    marginLeft: 'auto',
    width: 390,
    flexDirection: 'column',
    flexGrow: 1,
    border: '1px solid #ced4da',
    height: '100%',
  },
  header: {
    display: 'flex',
    paddingLeft: 36,
    paddingRight: 36,
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
    border: '1px solid #ced4da',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    fontSize: 15,
    padding: '10px 12px',
    width: '290px',
    marginBottom: 'auto',
    marginTop: 'auto',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  input: {
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    display: 'inline-flex',
    border: '1px solid #ced4da',
    zIndex: 1,
    flexGrow: 1,
  },
  buttonRoot: {
    height: 40,
  },
  showIconButton: {
    height: 30,
    opacity: 1,
    transition: 'all 0.5s ease-in-out',
  },
  hideIconButton: {
    height: 30,
    opacity: 0,
    transition: 'all 0.5s ease-in-out',
  },
})

const searchPanel = (props) => {
  const { loading, classes, value, changed, inputRef, clearClicked, searchClicked, open, transactions, closed, panelExited, optionClicked } = props;
  let transactionsList = (
    <Typography style={{ marginTop: 20 }} type='body1' align='center'> Please enter some value to search...</Typography>
  );
  if (value !== '' && transactions && transactions.length === 0) {
    transactionsList = (
      <Typography style={{ marginTop: 20 }} type='body1' align='center'> No search results found</Typography>
    );
  }
  if (loading) {
    transactionsList = (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography style={{ marginTop: 20 }} type='caption'>Searching...</Typography>
        <CircularProgress />
      </div>
    );
  }
  if (transactions && transactions.length > 0) {
    transactionsList = (
      <List component="nav" style={{ maxHeight: '89%', overflow: 'auto' }}>
        {transactions.map(transaction => {
          return (
            <div key={transaction._id} style={{ display: 'flex' }}>
              <ListItem button disableRipple>
                <ListItemText inset primary={transaction.names} />
                <Popup style={{ marginLeft: 'auto' }} options={['View', 'Edit', 'Use']} optionClicked={(option) => optionClicked(option, transaction)} />
              </ListItem>
            </div>
          );
        })}
      </List>
    );
  }
  let panel = (
    <div className={classes.panel} >
      <div style={{ display: 'flex', marginBottom: 10, alignItems: 'center' }}>
        <Typography type='title' style={{ flexGrow: 1 }} align='center'> Search Transaction </Typography>
        <IconButton style={{ zIndex: 1, marginLeft: 'auto' }} aria-label="close" onClick={closed}>
          <ChevronLeft />
        </IconButton>
      </div>
      <div className={classes.header}>
        <Input
          placeholder='Search By Name or Phone Number'
          // onKeyDown={(e) => { if (e.keyCode === 13) searchClicked(); }}
          inputRef={node => inputRef(node)}
          classes={{
            root: classes.textFieldRoot,
            input: classes.textFieldInput,
          }}
          id="adornment-search"
          type='input'
          value={value}
          onChange={changed}
          onSubmit={searchClicked}
          disableUnderline
          autoFocus
          endAdornment={
            <InputAdornment style={{ display: 'flex', height: '40px', position: 'absolute', left: '83%' }} position="end">
              {!value ?
                <IconButton className={classes.buttonRoot} disabled>
                  <Search style={{ height: 40 }} />
                </IconButton> :
                <IconButton className={classes.buttonRoot} onClick={clearClicked}>
                  <Clear style={{ height: 40 }} />
                </IconButton>
              }
            </InputAdornment>
          }
        />
      </div>
      {transactionsList}
    </div>
  );
  return (
    <Slide direction="right" in={open} mountOnEnter unmountOnExit onExited={panelExited}>
      {panel}
    </Slide>
  );
}

searchPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(searchPanel); 