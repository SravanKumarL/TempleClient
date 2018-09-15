import React from 'react';
import difference from 'lodash/difference';
import MultipleSelect from './MultiSelect';
import { getAllDays, pushIgnoredFocusElements } from '../../../shared/utility';
import {
    onDayChanged,
    onDaySlctnOpen,
    onDaySlctnClose,
    setCalendarOptions
} from '../../../../store/actions/datepicker';
import { connect } from 'react-redux';
import { ALL_DAYS } from '../../../../store/constants/transactions';
class DaysSelect extends React.Component {
    daySlctnChngdHandler = (selectedDays) => {
        const prevSelectedDays = this.props.selectedDays;
        const unselected = difference(prevSelectedDays, selectedDays)[0];
        const selected = difference(selectedDays, prevSelectedDays)[0];
        if (unselected === ALL_DAYS) {
            selectedDays = [];
        }
        else if (selected === ALL_DAYS) {
            selectedDays = getAllDays();
        }
        else {
            selectedDays = selectedDays.filter(day => day !== ALL_DAYS);
        }
        this.props.onDaysSelectedChanged(selectedDays);
    }
    componentDidMount() {
        const newCalendarOptions = pushIgnoredFocusElements(this.props.calendarOptions,
            [document.getElementById("dayMultiSelect")]);
        this.props.setCalendarOptions(newCalendarOptions);
    }
    render() {
        let { selectedDays, onDaySlctnOpen, onDaySlctnClose } = this.props;
        return (
            <MultipleSelect label='Days' items={getAllDays()} selItems={selectedDays}
                onItemSel={this.daySlctnChngdHandler} style={{ margin: '24px' }}
                onOpen={onDaySlctnOpen} onClose={onDaySlctnClose} />
        );
    }
}
const mapDispatchToProps = {
    onDaysSelectedChanged: onDayChanged,
    onDaySlctnOpen, onDaySlctnClose, setCalendarOptions
}
const mapStateToProps = state => ({
    selectedDays: state.datePicker.selectedDays,
    calendarOptions: state.datePicker.calendarOptions
});
export default connect(mapStateToProps, mapDispatchToProps)(DaysSelect);