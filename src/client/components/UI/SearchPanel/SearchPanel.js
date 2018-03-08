import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'material-ui/styles/withStyles';
import IconButton from 'material-ui/IconButton';
import Input, { InputAdornment } from 'material-ui/Input';
import Search from 'material-ui-icons/Search';
import ChevronRight from 'material-ui-icons/ChevronRight';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Slide from 'material-ui/transitions/Slide';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import { convertToStartCase } from '../../../shared/utility';
import green from 'material-ui/colors/green';

const styles = theme => ({
  root: {
    display: 'flex',
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
    width: 300,
    flexDirection: 'column',
    flexGrow: 1,
    borderLeft: '1px solid #EEE',
    borderTop: '1px solid #EEE',
    padding: 4,
    height: '100%',
  },
  header: {
    display: 'flex',
    borderBottom: '1px solid #eee',
  },
  input: {
    flexGrow: 1,
  }
})

const searchPanel = (props) => {
  const { classes, value, changed, radioNames, itemSelected, radioValue, radioChanged, searchClicked, open, transactions, closed, panelExited } = props;
  let transactionsList = null;
  if (transactions) {
    transactionsList = (
      <List component="nav">
        {transactions.map(transaction => {
          return (
            <ListItem key={transaction._id} button onClick={() => itemSelected(transaction)}>
              <ListItemText inset primary={transaction.names} />
            </ListItem>
          );
        })}
      </List>
    );
  }
  let panel = (
    <div className={classes.panel} >
      <div className={classes.header}>
        <IconButton style={{ zIndex: 1 }} aria-label="close" onClick={closed}>
          <ChevronRight />
        </IconButton>
        <Input
          className={classes.input}
          id="adornment-search"
          type='input'
          value={value}
          onChange={changed}
          onSubmit={searchClicked}
          disableUnderline
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={searchClicked}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <div>
        <FormControl component="fieldset" required className={classes.formControl}>
          <FormLabel component="legend">Search By</FormLabel>
          <RadioGroup
            aria-label="searchby"
            name="searchby1"
            className={classes.group}
            value={radioValue}
            onChange={radioChanged}
          >
            <FormControlLabel
              value={radioNames[0]}
              control={
                <Radio
                  classes={{
                    checked: classes.checked,
                  }}
                />
              }
              label={convertToStartCase(radioNames[0])} />
            <FormControlLabel
              value={radioNames[1]}
              control={
                <Radio
                  classes={{
                    checked: classes.checked,
                  }}
                />
              }
              label={convertToStartCase(radioNames[1])} />
          </RadioGroup>
        </FormControl>

      </div>
      {transactionsList}
    </div>
  );
  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit onExited={panelExited}>
      {panel}
    </Slide>
  );
}

searchPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(searchPanel); 