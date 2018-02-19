import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import SelectWrapped from './SelectWrapped/SelectWrapped';
import 'react-select/dist/react-select.css';

const suggestions = [
  { label: 'Ashwini' },
  { label: 'Bharani' },
  { label: 'Kritika' },
  { label: 'Rohini' },
  { label: 'Mrugasira' },
  { label: 'Arudra' },
  { label: 'Punarvasu' },
  { label: 'Pushyami' },
  { label: 'Aslesha' },
  { label: 'Makha' },
  { label: 'Pubba' },
  { label: 'Uttara' },
  { label: 'Hasta' },
  { label: 'Chitta' },
  { label: 'Swati' },
  { label: 'Vishaka' },
  { label: 'Anuradha' },
  { label: 'Jyesta' },
  { label: 'Moola' },
  { label: 'Purvashada' },
  { label: 'Uttarashada' },
  { label: 'Sravana' },
  { label: 'Dhanista' },
  { label: 'Satabisha' },
  { label: 'Purvabhadra' },
  { label: 'Uttarabhadra' },
  { label: 'Revati' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));




const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    width: '80%',
    margin: 'auto',

    // paddingTop: '10px'
    // marginBottom: '10px',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      // border: 0,
      height: 'auto',
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '8px 10px',
      width: 'calc(100% - 24px)',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
      // background: 'transparent',
      // '&:hover': {
      //   boxShadow: 'none',
      // },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});

const multiSelect = (props) => {
  const { classes, label, value, changed } = props;
  return (
    <Input
      disableUnderline
      fullWidth
      placeholder={label}
      inputComponent={SelectWrapped}
      inputProps={{
        classes,
        value: value,
        multi: true,
        onChange: changed,
        placeholder: label,
        instanceId: 'react-select-chip',
        id: 'react-select-chip',
        name: 'react-select-chip',
        simpleValue: true,
        options: suggestions,
      }}
    />
  );
}

multiSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(multiSelect);