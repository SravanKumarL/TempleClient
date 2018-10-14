import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import green from '@material-ui/core/colors/green';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    maxHeight: 200,
    minHeight: 200,
    overflow: 'auto',
    margin: '5px 0px',
    border: '1px solid #cad0d7',
    backgroundColor: theme.palette.background.paper,
  },
  checkroot: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

class CheckboxList extends React.Component {
  constructor() {
    super();
    this.selectAllHandler = this.selectAllHandler.bind(this);
  }
  state = {
    checked: [],
    selectAll: false,
    searchValue: '',
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.props.changed(newChecked.join(','));
    this.setState({
      checked: newChecked,
    });
  };
  selectAllHandler = () => {
    if (this.state.selectAll) {
      this.props.changed('');
      return this.setState({
        checked: [],
        selectAll: false,
      });
    }
    const checked = this.props.poojas.map(pooja => pooja.value);
    this.props.changed(checked.join(','));
    return this.setState({ checked, selectAll: true });
  }
  searchValueChangedHandler = (event) => {
    this.setState({ searchValue: event.target.value });
  }
  render() {
    const { classes } = this.props;
    let { poojas } = this.props;
    poojas = poojas.filter(pooja => {
      return pooja.value.toLowerCase().includes(this.state.searchValue.toLowerCase()) ? pooja : null;
    });
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <FormControl className={classes.margin}>
          <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
            Search a Pooja...
        </InputLabel>
          <Input
            id="bootstrap-input"
            disableUnderline
            value={this.state.searchValue}
            onChange={this.searchValueChangedHandler}
            classes={{
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
            }}
          />
        </FormControl>
        {/* <TextField
          type='text' label='Search a pooja...' value={this.state.searchValue}
          changed={this.searchValueChangedHandler}
          showLabels={true}
        /> */}
        <ListItem
          key='Select All'
          role={undefined}
          button
          style={{ height: 28, padding: 0, marginTop: 8 }}
          onClick={this.selectAllHandler}
          className={classes.listItem}
        >
          <Checkbox
            checked={this.state.selectAll}
            tabIndex={-1}
            disableRipple
            classes={{
              root: classes.checkroot,
              checked: classes.checked,
            }}
          />
          <ListItemText primary='Select All' />
        </ListItem>
        <div className={classes.root}>
          <List>
            {poojas.map(pooja => (
              <ListItem
                key={pooja.value}
                role={undefined}
                button
                style={{ height: 40 }}
                onClick={this.handleToggle(pooja.value)}
                className={classes.listItem}
              >
                <Checkbox
                  checked={this.state.checked.some(item => item === pooja.value)}
                  tabIndex={-1}
                  disableRipple
                  classes={{
                    root: classes.checkroot,
                    checked: classes.checked,
                  }}
                />
                <ListItemText primary={pooja.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);