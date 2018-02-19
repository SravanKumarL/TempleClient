import React, {   Component } from 'react';
// import moment from 'moment';
import { DatePicker } from 'material-ui-pickers';

export const datePicker = (props) => {
    const { selectedDate } = this.props;
    return (
      <div className="picker">
        <DatePicker
          keyboard
          clearable
          label="Choose a date"
          maxDateMessage="Date must be less than today"
          value={selectedDate}
          onChange={this.handleDateChange}
          animateYearScrolling={false}
        />
      </div>
    );
}