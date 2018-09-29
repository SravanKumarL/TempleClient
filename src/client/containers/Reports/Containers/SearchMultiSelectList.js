import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    maxHeight: 200,
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
});

class CheckboxList extends React.Component {
  state = {
    checked: [],
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

  render() {
    const { classes, poojas } = this.props;
    return (
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
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);