
// import 'flatpickr/dist/themes/material_green.css'
import React, { Component } from 'react'
import { render } from 'react-dom'

import Flatpickr from './Flatpickr'

class FlatDatePicker extends Component {
  state = {
    // v: '2016-01-01 01:01',
    mode:'single',
    selectedDates:[],
    // onChange: (_, str) => {
    //   console.info(str)
    // }
  }
  onModeSelected=(e)=>{
    const { value } = e.target;
    this.setState({mode:value,selectedDates:[]});
  }
  onDatesSelected=(selectedDates)=>{
    this.setState({selectedDates});
    // console.log(this.state.selectedDates);
  }
  getNumberOfDays = () => {
    return this.state.mode === 'range' && this.state.selectedDates.length === 2 ?
     Math.round((this.state.selectedDates[1].getTime() - this.state.selectedDates[0].getTime())/(1000*60*60*24)) : 
      this.state.selectedDates.length;
  }
  componentDidMount() {
    // setTimeout(() => {
    //   this.setState(state => ({
    //     v: state.v.replace('2016', '2017'),
    //     onChange: (_, str) => {
    //       console.info('New change handler: ', str)
    //     }
    //   }))
    // }, 2000)
  }
  radioButton=(btnName)=>(
    <label key={btnName}>
      <input type="radio" value={btnName} name={btnName} checked={this.state.mode===btnName} onChange={this.onModeSelected}/>
      {` ${btnName} `}
    </label>
  )
  render() {
    const { v } = this.state

    return (
      <div>
        <form>
          {['single','multiple','range'].map(x=>this.radioButton(x))}
        </form>
        <Flatpickr value={this.state.selectedDates} options={{mode: this.state.mode,allowInput: true}} onChange={this.onDatesSelected} />
          <br/>
        <label>{this.getNumberOfDays()}</label>
        {/* <Flatpickr data-enable-time className='test'
          onChange={(_, str) => console.info(str)} />
        <Flatpickr data-enable-time defaultValue='2016-11-11 11:11'
          onChange={(_, str) => console.info(str)} />
        <Flatpickr data-enable-time value={v}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr value={v} options={{minDate: '2016-11-01'}}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr value={[v, '2016-01-10']} options={{mode: 'range'}}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr onChange={this.state.onChange}
          onOpen={() => { console.info('opened (by prop)') }}
          options={{
            onClose: () => {
              console.info('closed (by option)')
            },
            maxDate: new Date()
          }} />
        <Flatpickr value={new Date()}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr value={v} options={{wrap: true}}
          onChange={(_, str) => console.info(str)}
        >
          <input type='text' data-input />
          <button type='button' data-toggle>Toggle</button>
          <button type='button' data-clear>Clear</button>
        </Flatpickr> */}
      </div>
    )
  }
}
export default FlatDatePicker;
// window.init = () => {
//   render(<App />, document.querySelector('#container'))
// }
