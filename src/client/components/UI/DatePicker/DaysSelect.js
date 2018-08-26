import React from 'react';
import difference from 'lodash/difference';
// import sortBy from 'lodash/sortBy';
import MultipleSelect from './MultiSelect';
import { getAllDays } from '../../../shared/utility';
import {
    onDayChanged,
    onDaySlctnOpen,
    onDaySlctnClose
} from '../../../../store/actions/datepicker';
// import { createSelector } from 'reselect';
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
        const { onDaySelectMount } = this.props;
        if (onDaySelectMount) {
            onDaySelectMount();
        }
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
    onDaySlctnOpen, onDaySlctnClose
}
const mapStateToProps = state => ({
    selectedDays: state.datePicker.selectedDays
});
export default connect(mapStateToProps, mapDispatchToProps)(DaysSelect);