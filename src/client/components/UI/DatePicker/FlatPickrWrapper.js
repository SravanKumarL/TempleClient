import _ from 'lodash';
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/themes/material_green.css'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flatpickr from './Flatpickr'
import RadioButtonsGroup from './RadioButtonsGroup';
import MultipleSelect from './MultiSelect';
class DatePickerWrapper extends Component {
  getAllDays = () => ['All days', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  getDaysOfWeek = () => this.getAllDays().filter(x => x !== 'All days');
  defaultState={
    selectedDates: [new Date()],
    selectedDays: this.getDaysOfWeek(),
    rangeOfDates: [],
    unFilteredRange:[]
  }
  state = {...this.defaultState, mode: 'single', closeOnSelect:true};
  liftStateUp = (props=this.props, state=this.state) => {
    const { onDateSelectionChanged } = props;
    onDateSelectionChanged(this.getSelectedDates(state));
  }
  getRangeStartEnd = (rangeOfDates) => [rangeOfDates[0], rangeOfDates[rangeOfDates.length - 1]];
  getFilteredDates = (selectedDays,rangeOfDates) => {
    let daysOfWeek = this.getDaysOfWeek();
    return rangeOfDates.filter(x => selectedDays.indexOf(daysOfWeek[x.getDay()]) !== -1);
  }
  isDaysInRange=(unFilteredRange,selDays)=>{
    let filteredDays=_.difference(this.getDaysOfWeek(),selDays);
    filteredDays=filteredDays.map(day=>this.getDaysOfWeek().indexOf(day));
    return unFilteredRange.some(date=>filteredDays.indexOf(date.getDay())!==-1);
  }
  isFilterApplied = () => (this.state.selectedDays.length > 0 && this.state.selectedDays.length < 7);
  getSelectedDates = (state) => {
    const {mode,selectedDays,rangeOfDates,selectedDates}=state;
    if (mode === 'range')
      return this.getFilteredDates(selectedDays,rangeOfDates);
    return selectedDates;
  }
  onDaySelected = (selectedDays) => {
    const prevSelectedDays=this.state.selectedDays;
    const unselected=_.difference(prevSelectedDays,selectedDays)[0];
    const selected = _.difference(selectedDays, prevSelectedDays)[0];
    if(selected==='All days')
      selectedDays = this.getAllDays();
    else if(unselected==='All days')
      selectedDays=[];
    else {
      if(prevSelectedDays.indexOf('All days')!==-1)
        selectedDays = selectedDays.filter(x => x !== 'All days');
      else if (selectedDays.length===7)
        selectedDays=this.getAllDays();
    }
    {
      const {mode,rangeOfDates}=this.state;
      if (mode === 'range' && selectedDays.length !== 0) {
        this.setState({ rangeOfDates : this.getFilteredDates(selectedDays,rangeOfDates) });
      }
    }
    // console.log(selectedDays);
    this.setState({selectedDays});
    this.liftStateUp();
  }
  onModeSelected = (selectedMode) => {
    this.setState((prevState)=> ({...this.defaultState, mode: selectedMode, closeOnSelect:selectedMode==='single' }));
    this.liftStateUp();
  }
  onDatesSelected = (selectedDates) => {
    if (this.state.mode === 'range' && selectedDates.length === 2) {
      let dates = [];
      let i = new Date(selectedDates[0]);
      while (i <= selectedDates[1]) {
        dates.push(new Date(i));
        i = new Date(i.setDate(i.getDate() + 1));
      }
      this.setState({ rangeOfDates: this.getFilteredDates(this.state.selectedDays,dates), unFilteredRange:dates });
    }
    // console.log(this.state.selectedDates);
    this.setState({ selectedDates });
    this.liftStateUp();
  }
  onClose = (selDates, dateStr, flatPickr) => {
    const {rangeOfDates}=this.state;
    this.setState({isCalOpen:false});
    
    if (this.isFilterApplied() && rangeOfDates.length > 0)
      this.setState({ selectedDates: this.getRangeStartEnd(rangeOfDates), mode:'range' });
    else
      this.setState({selectedDates:selDates});
    this.liftStateUp();
  }
  onOpen = (selDates, dateStr, flatPickr) => {
    if (this.isFilterApplied() && this.state.selectedDates.length === 2)
    {
      const {rangeOfDates,selectedDays,unFilteredRange}=this.state;
      const isInRange=this.isDaysInRange(unFilteredRange,selectedDays);
      if(isInRange)
        this.setState({ selectedDates: this.getFilteredDates(selectedDays,rangeOfDates), mode:'multiple' });
      else
        this.setState({ selectedDates: this.getRangeStartEnd(rangeOfDates), mode:'range' });
      this.liftStateUp();
    }
  }
  getNumberOfDays = () => {
    return this.state.mode === 'range' ? (this.state.selectedDays.length === 0 ? this.state.rangeOfDates.length : this.state.selectedDates.length) :
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
  onDaySelectOpen=()=>{
    this.setState((prevState)=>{
      let {selectedDays}=prevState
      if(selectedDays.length===7)
        return {selectedDays:this.getAllDays()};
    });
    this.liftStateUp();
  }
  onDaySelectClose=()=>{
    this.setState((prevState)=>({selectedDays:prevState.selectedDays.filter(x=>x!=='All days')}));
    this.liftStateUp();
  }
  render() {
    const {mode}=this.props;
    let datePickMode=mode;
    if(!mode)
      datePickMode=this.state.mode;
    return (
      <div>
        {mode!==undefined ||
        <div id="selection" style={{ display: 'flex' }}>
          <RadioButtonsGroup options={['single', 'multiple', 'range']} label='Calendar mode' mode={this.state.mode} 
            onModeSelect={this.onModeSelected} />
          {this.state.mode === 'range' &&
            <MultipleSelect label='Days' items={this.getAllDays()} selItems={this.state.selectedDays} onItemSel={this.onDaySelected} 
              style={{ margin: '24px' }} onOpen={this.onDaySelectOpen} onClose={this.onDaySelectClose}/>}
        </div>}
        <div id="datePickerWrap">
          <Flatpickr value={this.state.selectedDates} 
          options={{
            mode: datePickMode, allowInput: true, closeOnSelect: this.state.closeOnSelect,
            ignoredFocusElements: [document.getElementById('datePickerWrap'),document.getElementById('selection')]
          }} 
          onChange={this.onDatesSelected} onClose={this.onClose} onOpen={this.onOpen} />
        </div>
        <br />
        {/* <label>{this.getNumberOfDays()}</label> */}
      </div>
    )
  }
}
DatePickerWrapper.propTypes = {
  onDateSelectionChanged: PropTypes.func.isRequired
}
export default DatePickerWrapper;