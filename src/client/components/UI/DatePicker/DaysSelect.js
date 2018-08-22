import React from 'react';
import difference from 'lodash/difference';
import sortBy from 'lodash/sortBy';
import MultipleSelect from './MultiSelect';
import { getAllDays } from '../../../shared/utility';
import { onDayChanged } from '../../../../store/actions/datepicker';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
const ALL_DAYS = 'All days';
class DaysSelect extends React.Component {
    state = {
        selectedDays: this.props.selectedDays || getAllDays()
    }
    daySlctnChngdHandler = (selectedDays) => {
        const { prevSelectedDays } = this.state.selectedDays;
        const unselected = difference(prevSelectedDays, selectedDays)[0];
        const selected = difference(selectedDays, prevSelectedDays)[0];
        if (selected === ALL_DAYS) {
            this.setState({ selectedDays: getAllDays() });
        }
        else if (unselected === ALL_DAYS) {
            this.setState({ selectedDays: [] });
        }
        else {
            if (prevSelectedDays.indexOf(ALL_DAYS) !== -1) {
                this.setState({ selectedDays: selectedDays.filter(x => x !== ALL_DAYS) });
            }
            else if (selectedDays.length === 7) {
                this.setState({ selectedDays: getAllDays() });
            }
            this.setState({ selectedDays });
        }
    }
    daySlctnOpenHandler = () => {
        const { selectedDays } = this.props;
        if (selectedDays.length === 7) {
            this.setState({ selectedDays: getAllDays() });
        }
        this.setState({ selectedDays });
    }
    daySlctnCloseHandler = () => {
        this.setState({ selectedDays: this.props.selectedDays.filter(x => x !== ALL_DAYS) });
    }
    componentDidUpdate(prevProps, prevState) {
        const root = {
            prevState, state: this.state
        };
        if (checkIfDaysChanged(root)) {
            this.props.onDaysSelectedChanged(this.state.selectedDays.filter(day => day !== ALL_DAYS));
        }
    }
    componentDidMount() {
        const { onDaySelectMount } = this.props;
        if (onDaySelectMount) {
            onDaySelectMount();
        }
    }
    render() {
        let { selectedDays } = this.state;
        return (
            <MultipleSelect label='Days' items={getAllDays()} selItems={selectedDays}
                onItemSel={this.daySlctnChngdHandler} style={{ margin: '24px' }}
                onOpen={this.daySlctnOpenHandler} onClose={this.daySlctnCloseHandler} id="dayMultiSelect" />
        );
    }
}
const getPrevDays = root => root.prevState.selectedDays;
const getCurrDays = root => root.state.selectedDays;
const checkIfDaysChanged = createSelector([getPrevDays, getCurrDays], (prevDays, currDays) => {
    return difference(sortBy(currDays), sortBy(prevDays)).length !== 0;
});
const mapDispatchToProps = {
    onDaysSelectedChanged: onDayChanged
}
export default connect(null, mapDispatchToProps)(DaysSelect);