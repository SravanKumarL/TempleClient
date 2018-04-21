import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import {Select,ListItemText,Checkbox} from 'material-ui';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexGrow: 1,
    background: '#F5F5F5',
    marginBottom: 10,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  selectRoot: {
    maxWidth: 140,
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


class MultipleSelect extends React.Component {
  state = {
    open: false
  }
  handleChange = event => {
    // this.setState({ name: event.target.value });
    const { onItemSel } = this.props;
    onItemSel(event.target.value);
  };
  handleClose = event => {
    this.setState({ open: false });
    this.props.onClose();
  }
  handleOpen = event => {
    this.setState({ open: true });
    this.props.onOpen();
  }
  render() {
    const { classes, theme, label, items, selItems } = this.props;
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">{label}</InputLabel>
          <Select classes={{root:classes.selectRoot}}
            multiple
            value={selItems}
            onChange={this.handleChange}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
            open={this.state.open}
          >
            {items.map(item => (
              <MenuItem key={item} value={item}>
                <Checkbox checked={selItems.indexOf(item) > -1} />
                <ListItemText primary={item} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  selItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  onItemSel: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);