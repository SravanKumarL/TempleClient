import _ from 'lodash';
import 'flatpickr/dist/themes/material_green.css'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom'
import Flatpickr from './Flatpickr'
import RadioButtonsGroup from './RadioButtonsGroup';
import MultipleSelect from './MultiSelect';
class DatePickerWrapper extends Component {
  state = {
    mode: 'single',
    selectedDates: [],
    selectedDays: [],
    rangeOfDates:[]
  }
  componentDidUpdate=(prevProps,prevState)=>{
    const {onDateSelectionChanged}=this.prevProps;
    onDateSelectionChanged(this.getSelectedDates(prevState));
  }
  getAllDays=()=>['All days','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  getFilteredDates=(selectedDays)=>{
    let daysOfWeek=this.getDaysOfWeek();
    return this.state.rangeOfDates.filter(x => selectedDays.indexOf(daysOfWeek[x.getDay()]) !== -1);
  }
  isFilterApplied=()=>this.state.mode==='range' && this.state.selectedDays.length > 0;
  getDaysOfWeek=()=>this.getAllDays().filter(x=>x!=='All days');
  getRangeStartEnd=()=>[this.state.rangeOfDates[0],this.state.rangeOfDates[this.state.rangeOfDates.length-1]];
  getSelectedDates=(state)=>{
    if(state.mode==='range')
      return this.getFilteredDates(state.selectedDays);
    return state.selectedDates;
  }
  onDaySelected=(selectedDays)=>{
    if(selectedDays.indexOf('All days')!==-1)
    {
      if(this.getAllDays().length>selectedDays.length)
        selectedDays = this.getAllDays();
      else
        selectedDays=selectedDays.filter(x=>x!=='All days');
    }
    else if(_.isEqual(selectedDays.sort(),this.getDaysOfWeek().sort()))
      selectedDays=[];
    if (this.state.mode==='range' && selectedDays.length !== 0) {
      this.getFilteredDates(selectedDays);
      this.setState({ selectedDates:rangeOfDates });
    }
    // console.log(selectedDays);
    this.setState({
      selectedDays
    });
  }
  onModeSelected = (selectedMode) => {
      this.setState({ mode: selectedMode, selectedDates: [],selectedDays:[],rangeOfDates:[] });
  }
  onDatesSelected = (selectedDates) => {
    if(this.state.mode === 'range' && selectedDates.length===2)
    {
      let dates=[];
      let i=new Date(selectedDates[0]);
      while(i<=selectedDates[1]){
        dates.push(new Date(i));
        i=new Date(i.setDate(i.getDate()+1));
      }
      this.setState({rangeOfDates:dates});
    }
    this.setState({selectedDates});
    // console.log(this.state.selectedDates);
  }
  onClose=(selDates,dateStr,flatPickr)=>{
    if(this.isFilterApplied() && this.state.rangeOfDates>0)
      this.setState({selectedDates:this.getRangeStartEnd()});
  }
  onOpen=(selDates,dateStr,flatPickr)=>{
    if(this.isFilterApplied())
      this.setState({selectedDates:this.getFilteredDates(this.state.selectedDays)});
  }
  getNumberOfDays = () => {
    return this.state.mode === 'range' ? (this.state.selectedDays.length===0 ? this.state.rangeOfDates.length : this.state.selectedDates.length):
    this.state.selectedDates.length;
  }
  getMode=()=>{
    if(this.isFilterApplied()) {
      if(_.isEqual(this.state.selectedDates.sort(),this.getRangeStartEnd().sort()))
        return 'range';
      return 'multiple';
    }
    return this.state.mode;
  }
  render() {
    return (
      <div>
        <div className="selection" style={{display:'flex'}}>
        <RadioButtonsGroup options={['single', 'multiple', 'range']} label='Calendar mode' mode={this.state.mode} onModeSelect={this.onModeSelected}/>
          {this.state.mode === 'range' &&
            <MultipleSelect label='Days' items={this.getAllDays()} selItems={this.state.selectedDays} onItemSel={this.onDaySelected} style={{margin:'24px'}}/>}
          </div>
        <div className="datePickerWrap">
          <Flatpickr value={this.state.selectedDates} options={{
            mode: this.getMode(), allowInput: true, closeOnSelect: false,
            ignoredFocusElements: [document.getElementsByClassName('datePickerWrap')[0]]
          }} onChange={this.onDatesSelected} onClose={this.onClose}/>
        </div>
        <br />
        {/* <label>{this.getNumberOfDays()}</label> */}
      </div>
    )
  }
}
DatePickerWrapper.propTypes={
  onDateSelectionChanged:PropTypes.func.isRequired
}
export default DatePickerWrapper;