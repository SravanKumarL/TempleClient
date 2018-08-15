import { sortBy, isEqual, difference } from 'lodash';
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/themes/material_blue.css'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flatpickr from './Flatpickr'
import RadioButtonsGroup from '../RadioGroup/RadioGroup';
import MultipleSelect from './MultiSelect';
import { getCurrentDate, getDaysOfWeek } from '../../../shared/utility';
import moment from 'moment';
import { CALENDER_MODE } from '../../../../store/constants/transactions';

const { RANGE, SINGLE, MULTIPLE } = CALENDER_MODE;

class DatePickerWrapper extends Component {
  getAllDays = () => ['All days', ...getDaysOfWeek()];
  getRangeStartEnd = (unFilteredRange) => [unFilteredRange[0], unFilteredRange[unFilteredRange.length - 1]];
  getDate = (dateString) => {
    const parts = dateString.split('-');
    return new Date(Date.parse(`${parts[2]}-${parts[1]}-${parts[0]}`));
  }
  getFilteredDates = (selectedDays, unFilteredRange) => {
    let daysOfWeek = getDaysOfWeek();
    if (selectedDays.length === 0 || selectedDays.length === 7) {
      return unFilteredRange;
    }
    return unFilteredRange.filter(x => selectedDays.indexOf(daysOfWeek[this.getDate(x).getDay()]) !== -1);
  }
  getSelectedDates = (state) => {
    const { datePickerMode, selectedDays, unFilteredRange, selectedDates } = state;
    if (datePickerMode === RANGE && selectedDates.length === 2) {
      return this.getFilteredDates(selectedDays, unFilteredRange);
    }
    return selectedDates;
  }
  constructor(props) {
    super(props);
    this.defaultState = {
      selectedDates: props.value || [getCurrentDate()],
      selectedDays: getDaysOfWeek(),
      filteredRange: [getCurrentDate()],
      unFilteredRange: [getCurrentDate()],
      datePickerMode: SINGLE,
      mode: SINGLE,
      getSelectedDates: this.getSelectedDates.bind(this)
    }
    this.state = { ...this.defaultState, defaultState: { ...this.defaultState }, prevProps: {} };
    this.onDatesSelected = this.onDatesSelected.bind(this);
  }
  isDaysInRange = (unFilteredRange, selDays) => {
    // let filteredDays = difference(getDaysOfWeek(), selDays);
    selDays = selDays.map(day => getDaysOfWeek().indexOf(day));
    return unFilteredRange.some(date => selDays.indexOf(this.getDate(date).getDay()) !== -1);
  }
  isFilterApplied = () => (this.state.selectedDays.length > 0 && this.state.selectedDays.length < 7);
  onDaySelected = (selectedDays) => {
    const prevSelectedDays = this.state.selectedDays;
    const unselected = difference(prevSelectedDays, selectedDays)[0];
    const selected = difference(selectedDays, prevSelectedDays)[0];
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
      if (datePickerMode === RANGE && selectedDays.length > 0 && selectedDays.length < 8) {
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
      });
    });
    // this.liftStateUp();
  }
  onDatesSelected = (selectedDates, currentDateString, instance, data) => {
    if (this.state.datePickerMode === RANGE) {
      if (selectedDates.length === 2) {
        let dates = [];
        let i = new Date(selectedDates[0]);
        while (moment(i, "DD/MM/YYYY") <= moment(selectedDates[1], "DD/MM/YYYY")) {
          dates.push(new Date(i));
          i = new Date(i.setDate(i.getDate() + 1));
        }
        dates = dates.map(date => getCurrentDate(date));
        selectedDates = selectedDates.map(date => getCurrentDate(date));
        this.setState({ unFilteredRange: dates, filteredRange: this.getFilteredDates(this.state.selectedDays, dates) });
        if (this.isFilterApplied()) {
          this.setState({ selectedDates: this.getFilteredDates(this.state.selectedDays, dates) });
        }
        else {
          this.setState({ selectedDates, unFilteredRange: dates, filteredRange: dates });
        }
      }
      else {
        let stringedDates = selectedDates.map(date => getCurrentDate(date));
        if (selectedDates.length === 0) {
          stringedDates = [getCurrentDate()];
        }
        this.setState({
          selectedDates: stringedDates,
          unFilteredRange: stringedDates, filteredRange: stringedDates
        });
      }
    }
    else {
      this.setState((prevState) => {
        selectedDates = selectedDates.map(date => getCurrentDate(date));
        if (selectedDates && selectedDates.length > 0)
          return { selectedDates };
        return {};
      });
      if (selectedDates.length > 0) {
        this.flatPickrInstance.jumpToDate(this.getDate(selectedDates[selectedDates.length - 1]));
      }
    }
  }
  onClose = (selDates, dateStr, flatPickr) => {
    const { unFilteredRange } = this.state;
    if (this.isFilterApplied()) {
      this.setState({ selectedDates: this.getRangeStartEnd(unFilteredRange), datePickerMode: RANGE });
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
        this.setState({ selectedDates: this.getFilteredDates(selectedDays, unFilteredRange), datePickerMode: MULTIPLE });
      }
      else {
        this.setState({ selectedDates: this.getRangeStartEnd(unFilteredRange), datePickerMode: RANGE });
      }
      // this.liftStateUp();
    }
  }
  getNumberOfDays = () => {
    return this.state.datePickerMode === RANGE ? (this.state.selectedDays.length === 0 ? this.state.unFilteredRange.length :
      this.state.selectedDates.length) :
      this.state.selectedDates.length;
  }
  // getMode = () => {
  //   if (this.isFilterApplied() && this.state.selectedDates.length===2) {
  //     if(this.state.isCalOpen)
  //       return MULTIPLE;
  //     else
  //       return RANGE;
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
  onValueUpdate = (dates, currentDateString, instance, data) => {
    this.flatPickrInstance = instance;
  }
  static getDerivedStateFromProps(props, state) {
    const selectedDates = state.getSelectedDates(state);
    if (!props.value || props.value === '' || props.value.length === 0) {
      return { ...state.defaultState, prevProps: props };
    }
    else {
      let update = {};
      const propValChanged = !isEqual(sortBy(props.value), sortBy(state.prevProps.value));
      if (!isEqual(sortBy(props.value), sortBy(selectedDates)) && propValChanged) {
        update = { ...update, selectedDates: props.value };
      }
      if (propValChanged) {
        update = { ...update, prevProps: { ...state.prevProps, value: props.value } };
      }
      if (Object.keys(update).length > 0) {
        return update;
      }
      return null;
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    let selectedDates = this.state.getSelectedDates(this.state);
    if (!isEqual(sortBy(this.props.value), sortBy(selectedDates))) {
      this.props.onDateSelectionChanged(selectedDates, this.state.selectedDays, this.state.datePickerMode);
    }
  }
  render() {
    const { minDate, maxDate } = this.props;
    const { mode, selectedDays, selectedDates } = this.state;
    let { datePickerMode } = this.state;
    datePickerMode = this.props.mode || datePickerMode;
    const disable = [date => {
      const { selectedDates } = this.state;
      if (selectedDates.length >= 10 && selectedDates.indexOf(getCurrentDate(date)) === -1) {
        return true;
      }
      return false;
    }];
    let calendarOptions = {
      mode: datePickerMode, allowInput: true,
      ignoredFocusElements: [document.getElementById('datePickerWrap'), document.getElementById('selection')],
      dateFormat: "d-m-Y", disableMobile: true
    };
    calendarOptions = minDate ? { ...calendarOptions, minDate } : calendarOptions;
    calendarOptions = maxDate ? { ...calendarOptions, maxDate } : calendarOptions;
    if (datePickerMode === MULTIPLE) {
      calendarOptions = { ...calendarOptions, disable };
    }
    return (
      <div>
        {this.props.mode ||
          <div id="selection" style={{ display: 'flex' }}>
            <RadioButtonsGroup options={[SINGLE, MULTIPLE, RANGE]} label='Calendar mode' mode={mode}
              onModeSelect={this.onModeSelected} />
            {mode === RANGE &&
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