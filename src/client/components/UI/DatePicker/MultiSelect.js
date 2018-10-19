import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

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

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 400,
      width: 250,
    },
  },
};

const initialState = { open: false };
class MultipleSelect extends React.Component {
  state = { ...initialState }
  handleChange = event => {
    const { onItemSel } = this.props;
    onItemSel(event.target.value);
  };
  handleClose = event => {
    this.setState({ open: false });
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  }
  handleOpen = event => {
    this.setState({ open: true });
    const { onOpen } = this.props;
    if (onOpen) {
      onOpen();
    }
  }
  render() {
    const { classes, label, items, selItems } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">{label}</InputLabel>
          <Select classes={{ root: classes.selectRoot }}
            multiple
            value={selItems}
            onChange={this.handleChange}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
            open={open}
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