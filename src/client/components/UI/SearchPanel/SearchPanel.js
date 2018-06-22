import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import ChevronRight from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import green from '@material-ui/core/colors/green';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from './ListItem';


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
    marginTop: 10,
    marginLeft: 'auto',
    width: 390,
    flexDirection: 'column',
    flexGrow: 1,
    // border: '1px solid #ced4da',
    boxShadow: theme.shadows[4],
    height: '100%',
  },
  header: {
    display: 'flex',
    paddingLeft: 36,
    paddingRight: 36,
    marginTop: 10,
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
    padding: '0.7rem 2.9rem 0.7rem 0.8rem',
    width: '290px',
    marginBottom: 'auto',
    marginTop: 'auto',
    boxShadow: theme.shadows[2],
    '&:hover': {
      boxShadow: theme.shadows[5],
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

})
class SearchPanel extends React.Component {
  state = {
    showIcon: false,
  }
  toggleIconButton = (showHide) => {
    this.setState({ showIcon: showHide });
  }
  render() {
    const { loading, classes, value, changed, inputRef, clearClicked, searchClicked, open, transactions, closed, panelExited, optionClicked } = this.props;
    let transactionsList = (
      <Typography style={{ marginTop: 20 }} variant='body1' align='center'> Please enter some value to search...</Typography>
    );
    if (value !== '' && transactions && transactions.length === 0) {
      transactionsList = (
        <Typography style={{ marginTop: 20 }} variant='body1' align='center'> No search results found</Typography>
      );
    }
    if (loading) {
      transactionsList = (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography style={{ marginTop: 20 }} variant='caption'>Searching...</Typography>
          <CircularProgress />
        </div>
      );
    }
    if (transactions && transactions.length > 0) {
      transactionsList = (
        <List component="nav" style={{ maxHeight: '87%', overflow: 'auto' }}>
          {transactions.map(transaction => {
            return (
              <div key={`${transaction.phoneNumber}_${transaction.id}`} style={{ display: 'flex' }}>
                <ListItem optionClicked={optionClicked} transaction={transaction} />
              </div>
            );
          })}
        </List>
      );
    }
    let panel = (
      <div className={classes.panel} >
        <div style={{ display: 'flex', alignItems: 'center', background: '#37474F', }}>
          <IconButton style={{ zIndex: 1, marginLeft: 'auto', color: 'white' }} aria-label="close" onClick={closed}>
            <ChevronRight />
          </IconButton>
          <Typography variant='title' style={{ flexGrow: 1, color: 'white' }} align='center'> Search Transaction </Typography>
        </div>
        <div className={classes.header}>
          <Input
            placeholder='Search By Name or Phone Number'
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
              <InputAdornment style={{ display: 'flex', height: '40px', position: 'absolute', left: '83%', maxHeight: 'initial' }} position="end">
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
      <Slide in={open} direction='left' timeout={100} mountOnEnter unmountOnExit onExited={panelExited}>
        {panel}
      </Slide>
    );
  }
}

SearchPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchPanel); 