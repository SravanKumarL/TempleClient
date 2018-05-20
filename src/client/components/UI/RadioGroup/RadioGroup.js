import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { convertToStartCase } from '../../../shared/utility';

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    background: '#F5F5F5',
    marginBottom: '10px',
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing.unit,
  },
  group: {
    margin: `${theme.spacing.unit}px`,
  },
});

class RadioButtonsGroup extends React.Component {
  // state = {
  //   value: ''
  // };
  handleChange = (event, value) => {
    // this.setState({ value });
    const { onModeSelect } = this.props;
    onModeSelect(value);
  };
  render() {
    //mode:calendar mode
    const { classes, options, label, mode } = this.props;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel >{label}</FormLabel>
          <RadioGroup aria-label={label} name={label} className={classes.group} value={mode} onChange={this.handleChange} row={true} >
            {options.map(x => <FormControlLabel key={x} value={x} control={<Radio color='primary' />} label={convertToStartCase(x)} />)}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}
RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  mode: PropTypes.string.isRequired,
  onModeSelect: PropTypes.func.isRequired
};

export default withStyles(styles)(RadioButtonsGroup);