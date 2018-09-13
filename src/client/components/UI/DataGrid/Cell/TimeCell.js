import React from 'react';
// import Flatpickr from '../../DatePicker/Flatpickr';
import { TableCell } from '@material-ui/core';
import TimePicker from '../../TimePicker/TimePicker';
// const TimePicker = props => {
//     return (<Flatpickr options={{
//         enableTime: true,
//         noCalendar: true,
//         dateFormat: "H:i",
//         minDate: props.minTime,
//         maxDate: props.maxTime,
//         value: props.value
//     }} {...props} onChange={props.onChange} onClearClicked={props.onClearClicked} />);
// }
export default class TimeCell extends React.Component {
    getCurrentTime = () => new Date().toTimeString().split(' ')[0];
    get12HrTime = time => Number(time.split(':')[0]) > 12 ?
        `${Number(time.split(':')[0]) - 12}:${time.split(':').slice(1).join(':')} PM` :
        `${time} AM`;
    state = {
        from: this.props.defaultValue || this.getCurrentTime(),
        to: this.props.defaultValue || this.getCurrentTime()
    }
    changeHandler = (value, label) => {
        this.setState({ [label.toLowerCase()]: value }, () => {
            this.props.onValueChange(`${this.get12HrTime(this.state.from)} to ${this.get12HrTime(this.state.to)}`);
        });
    }
    render() {
        const { from, to } = this.state;
        return (
            <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <TimePicker onChange={this.changeHandler} value={from} label='From' />
                    <TimePicker onChange={this.changeHandler} value={to} label='To' />
                </div>
            </TableCell>
        );
    }
}