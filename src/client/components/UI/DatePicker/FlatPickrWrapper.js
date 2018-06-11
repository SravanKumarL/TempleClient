import _ from 'lodash';
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/themes/material_blue.css'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flatpickr from './Flatpickr'
import RadioButtonsGroup from '../RadioGroup/RadioGroup';
import MultipleSelect from './MultiSelect';
import { getCurrentDate } from '../../../shared/utility';
import moment from 'moment';

class DatePickerWrapper extends Component {
  getAllDays = () => ['All days', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  getDaysOfWeek = () => this.getAllDays().filter(x => x !== 'All days');
  getRangeStartEnd = (unFilteredRange) => [unFilteredRange[0], unFilteredRange[unFilteredRange.length - 1]];
  getDate = (dateString) => {
    const parts = dateString.split('-');
    return new Date(Date.parse(`${parts[2]}-${parts[1]}-${parts[0]}`));
  }
  getFilteredDates = (selectedDays, unFilteredRange) => {
    let daysOfWeek = this.getDaysOfWeek();
    if (selectedDays.length === 0) {
      return unFilteredRange;
    }
    return unFilteredRange.filter(x => selectedDays.indexOf(daysOfWeek[this.getDate(x).getDay()]) !== -1);
  }
  getSelectedDates = (state) => {
    const { datePickerMode, selectedDays, unFilteredRange, selectedDates } = state;
    if (datePickerMode === 'range' && selectedDates.length === 2) {
      return this.getFilteredDates(selectedDays, unFilteredRange);
    }
    return selectedDates;
  }
  defaultState = {
    selectedDates: [getCurrentDate()],
    selectedDays: [],
    filteredRange: [],
    unFilteredRange: [],
    datePickerMode: 'single',
    mode: 'single',
    closeOnSelect: true,
    getSelectedDates: this.getSelectedDates.bind(this)
  }
  state = { ...this.defaultState, defaultState: { ...this.defaultState }, prevProps: {} };
  isDaysInRange = (unFilteredRange, selDays) => {
    // let filteredDays = _.difference(this.getDaysOfWeek(), selDays);
    selDays = selDays.map(day => this.getDaysOfWeek().indexOf(day));
    return unFilteredRange.some(date => selDays.indexOf(this.getDate(date).getDay()) !== -1);
  }
  isFilterApplied = () => (this.state.selectedDays.length > 0 && this.state.selectedDays.length < 7);
  onDaySelected = (selectedDays) => {
    const prevSelectedDays = this.state.selectedDays;
    const unselected = _.difference(prevSelectedDays, selectedDays)[0];
    const selected = _.difference(selectedDays, prevSelectedDays)[0];
    if (selected === 'All days') {
      selectedDays = this.getAllDays();
    }
    else if (unselected === 'All days') {
      selectedDays = [];
    }
    else {
      if (prevSelectedDays.indexOf('All days') !== -1)
        selectedDays = selectedDays.filter(x => x !== 'All days');
      else if (selectedDays.length === 7)
        selectedDays = this.getAllDays();
    }
    {
      const { datePickerMode, unFilteredRange } = this.state;
      if (datePickerMode === 'range' && selectedDays.length > 0 && selectedDays.length < 8) {
        this.setState({ filteredRange: this.getFilteredDates(selectedDays, unFilteredRange) });
      }
    }
    // console.log(selectedDays);
    this.setState({ selectedDays });
    // this.liftStateUp();
  }
  onModeSelected = (selectedMode) => {
    this.setState((prevState) => {
      return ({
        ...this.defaultState, mode: selectedMode, datePickerMode: selectedMode,
        closeOnSelect: selectedMode === 'single'
      });
    });
    // this.liftStateUp();
  }
  onDatesSelected = (selectedDates) => {
    if (this.state.datePickerMode === 'range' && selectedDates.length === 2) {
      let dates = [];
      let i = new Date(selectedDates[0]);
      while (moment(i, "DD/MM/YYYY") <= moment(selectedDates[1], "DD/MM/YYYY")) {
        dates.push(new Date(i));
        i = new Date(i.setDate(i.getDate() + 1));
      }
      dates = dates.map(date => getCurrentDate(date));
      selectedDates = selectedDates.map(date => getCurrentDate(date));
      this.setState({ unFilteredRange: dates });
      if (this.isFilterApplied()) {
        this.setState({ selectedDates: this.getFilteredDates(this.state.selectedDays, dates) });
      }
      else {
        this.setState({ selectedDates });
      }
    }
    else {
      this.setState((prevState) => {
        selectedDates = selectedDates.map(date => getCurrentDate(date));
        if (selectedDates && selectedDates.length > 0)
          return { selectedDates };
        return {};
      });
      this.flatPickrInstance.jumpToDate(this.getDate(selectedDates[selectedDates.length-1]));
    }
  }
  onClose = (selDates, dateStr, flatPickr) => {
    const { unFilteredRange } = this.state;
    if (this.isFilterApplied()) {
      this.setState({ selectedDates: this.getRangeStartEnd(unFilteredRange), datePickerMode: 'range' });
    }
    else {
      this.setState({ selectedDates: selDates.map(selDate => getCurrentDate(selDate)) });
    }
    // this.liftStateUp();
  }
  onOpen = (selDates, dateStr, flatPickr) => {
    if (this.isFilterApplied() && this.state.selectedDates.length === 2) {
      const { unFilteredRange, selectedDays } = this.state;
      const isInRange = this.isDaysInRange(unFilteredRange, selectedDays);
      if (isInRange) {
        this.setState({ selectedDates: this.getFilteredDates(selectedDays, unFilteredRange), datePickerMode: 'multiple' });
      }
      else {
        this.setState({ selectedDates: this.getRangeStartEnd(unFilteredRange), datePickerMode: 'range' });
      }
      // this.liftStateUp();
    }
  }
  getNumberOfDays = () => {
    return this.state.datePickerMode === 'range' ? (this.state.selectedDays.length === 0 ? this.state.unFilteredRange.length :
      this.state.selectedDates.length) :
      this.state.selectedDates.length;
  }
  // getMode = () => {
  //   if (this.isFilterApplied() && this.state.selectedDates.length===2) {
  //     if(this.state.isCalOpen)
  //       return 'multiple';
  //     else
  //       return 'range';
  //   }
  //   return this.state.mode;
  // }
  onDaySelectOpen = () => {
    this.setState((prevState) => {
      let { selectedDays } = prevState
      if (selectedDays.length === 7) {
        return { selectedDays: this.getAllDays() };
      }
    });
    // this.liftStateUp();
  }
  onDaySelectClose = () => {
    this.setState((prevState) => ({ selectedDays: prevState.selectedDays.filter(x => x !== 'All days') }));
    // this.liftStateUp();
  }
  onClearClicked = () => this.setState(prevState => {
    const { mode, datePickerMode, ...restProps } = { ...this.defaultState };
    return { ...restProps, datePickerMode: prevState.mode, closeOnSelect: prevState.mode === 'single' };
  });
  onValueUpdate = (e, currentDateString, instance, data) => {
    this.flatPickrInstance= instance;
  }
  static getDerivedStateFromProps(props, state) {
    const selectedDates = state.getSelectedDates(state);
    if (!props.value || props.value === '' || props.value.length === 0) {
      return { ...state.defaultState, prevProps: props };
    }
    else {
      if (!_.isEqual(_.sortBy(props.value), _.sortBy(selectedDates)) && !_.isEqual(props.value, state.prevProps.value)) {
        return { selectedDates: props.value, prevProps: { ...state.prevProps, value: props.value } };
      }
      else if (!_.isEqual(props.value, state.prevProps.value)) {
        return { prevProps: { ...state.prevProps, value: props.value } };
      }
      return null;
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const selectedDates = this.state.getSelectedDates(this.state);
    if (!_.isEqual(_.sortBy(this.props.value), _.sortBy(selectedDates))) {
      this.props.onDateSelectionChanged(selectedDates);
    }
  }
  render() {
    const { minDate, maxDate } = this.props;
    const { mode, closeOnSelect, selectedDays, selectedDates } = this.state;
    let { datePickerMode } = this.state;
    datePickerMode = this.props.mode || datePickerMode;
    let calendarOptions = {
      mode: datePickerMode, allowInput: true, closeOnSelect: closeOnSelect,
      ignoredFocusElements: [document.getElementById('datePickerWrap'), document.getElementById('selection')],
      dateFormat: "d-m-Y"
    };
    calendarOptions = minDate ? { ...calendarOptions, minDate } : calendarOptions;
    calendarOptions = maxDate ? { ...calendarOptions, maxDate } : calendarOptions;
    return (
      <div>
        {this.props.mode ||
          <div id="selection" style={{ display: 'flex' }}>
            <RadioButtonsGroup options={['single', 'multiple', 'range']} label='Calendar mode' mode={mode}
              onModeSelect={this.onModeSelected} />
            {mode === 'range' &&
              <MultipleSelect label='Days' items={this.getAllDays()} selItems={selectedDays} onItemSel={this.onDaySelected}
                style={{ margin: '24px' }} onOpen={this.onDaySelectOpen} onClose={this.onDaySelectClose} />}
          </div>}
        <div id="datePickerWrap">
          <Flatpickr value={selectedDates}
            options={calendarOptions}
            onChange={this.onDatesSelected} onClose={this.onClose} onOpen={this.onOpen} onClearClicked={this.onClearClicked} onValueUpdate={this.onValueUpdate} />
        </div>
      </div>
    )
  }
}
DatePickerWrapper.propTypes = {
  onDateSelectionChanged: PropTypes.func.isRequired
}
export default DatePickerWrapper;