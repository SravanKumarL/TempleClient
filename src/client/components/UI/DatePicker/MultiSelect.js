import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { ListItemText } from 'material-ui/List';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    marginTop:'40px',
    minWidth: 120,
    maxWidth: 300,
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
  state={
    open:false
  }
  handleChange = event => {
    // this.setState({ name: event.target.value });
    const {onItemSel}=this.props;
    onItemSel(event.target.value);
  };
  handleClose=event=>{
    this.setState({open:false});
    this.props.onClose();
  }
  handleOpen=event=>{
    this.setState({open:true});
    this.props.onOpen();
  }
  render() {
    const { classes, theme,label,items,selItems } = this.props;
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple">{label}</InputLabel>
          <Select
            multiple
            value={selItems}
            onChange={this.handleChange}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            input={<Input id="select-multiple" />}
            MenuProps={MenuProps}
            open={this.state.open}
          >
            {items.map(item => (
              <MenuItem
                key={item}
                value={item}
                style={{
                  fontWeight:
                  selItems.indexOf(item) === -1
                      ? theme.typography.fontWeightRegular
                      : theme.typography.fontWeightMedium,
                }}
              >
                {item}
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
  label:PropTypes.string.isRequired,
  items:PropTypes.arrayOf(PropTypes.string).isRequired,
  selItems:PropTypes.arrayOf(PropTypes.string).isRequired,
  onItemSel:PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);