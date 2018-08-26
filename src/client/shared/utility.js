import moment from 'moment';
import { startCase, toLower/* , sampleSize, sortBy */ } from 'lodash';
import { CALENDER_MODE } from '../../store/constants/transactions';
export const updateObject = (oldObject, updatedObject) => {
  return {
    ...oldObject,
    ...updatedObject
  };
}
export const replaceObjectKey = (oldObject, source, target, targetObj) => {
  const newObject = Object.keys(oldObject).reduce((acc, item) => {
    if (item === source) {
      acc[target] = targetObj;
    } else {
      acc[item] = oldObject[item];
    }
    return acc;
  }, {});
  return newObject;
}
export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }
  if (rules.required) {
    isValid = value ? value.trim() !== '' && isValid : false;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  if (rules.isEmail) {
    const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.isAlphaNumeric) {
    isValid = value && /[^a-zA-Z0-9 ]/i.test(value);
  }
  if (rules.isPhoneNumber) {
    isValid = value && !/^(0|[1-9][0-9]{9})$/i.test(value)
  }
  return isValid;
}

export const getCurrentDate = (date = new Date()) => {
  let today = date;
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  today = `${dd}-${mm}-${yyyy}`;
  return today;
}
export const getFormattedDate = (selectedDates, dateMode) => {
  if (dateMode === CALENDER_MODE.RANGE) {
    return `${selectedDates[0]} to ${selectedDates[selectedDates.length - 1]}`;
  }
  // else if (dateMode === CALENDER_MODE.MULTIPLE) {
  //   let sampledDates = selectedDates.slice(1, selectedDates.length - 2);
  //   return sortBy([selectedDates[0], ...sampleSize(sampledDates, 3), selectedDates[selectedDates.length - 1]]).join(',');
  // }
  return selectedDates.join(',');
}
const getDaysOfTheWeek = () => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const filterDates = (selectedDays, unFilteredRange) => {
  let daysOfWeek = getDaysOfTheWeek();
  if (selectedDays.length === 0 || selectedDays.length >= 7) {
    return unFilteredRange;
  }
  return unFilteredRange.filter(x => selectedDays.indexOf(daysOfWeek[x.getDay()]) !== -1);
}
export const isFilterApplied = selectedDays => selectedDays.length > 0 && selectedDays.length < 7;
export const getAllDays = () => ['All days', ...getDaysOfTheWeek()];
export const getDaysOfWeek = getDaysOfTheWeek;
export const getDateDifference = (from, to) => {
  const fromDate = moment(from); //todays date
  const toDate = moment(to); // another date
  const duration = moment.duration(toDate.diff(fromDate));
  const days = duration.asDays();
  return days;
}
export const getDateFromString = (dateString) => {
  const parts = dateString.split('-');
  return new Date(Date.parse(`${parts[2]}-${parts[1]}-${parts[0]}`));
}
export const convertToStartCase = (identifier) => {
  return startCase(toLower(identifier));
}
export const getDefaultCalendarOptions = (mode, defaultDate, minDate, maxDate, ignoredFocusElements = []) => {
  let calendarOptions = {
    mode: mode, allowInput: true, defaultDate,
    ignoredFocusElements: ignoredFocusElements || [],
    dateFormat: "d-m-Y", disableMobile: true
  };
  calendarOptions = minDate ? { ...calendarOptions, minDate } : calendarOptions;
  calendarOptions = maxDate ? { ...calendarOptions, maxDate } : calendarOptions;
  return calendarOptions;
}


/* eslint-disable */
const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
export const isNumber = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined
export const isAlphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined
/* eslint-enable */
export const getFormattedColumns = (columns) => {
  if (columns !== undefined && columns.length !== 0) {
    if (columns.every(column => checkIfObject(column))) {
      if (columns.every(column => column.hasOwnProperty('name') && column.hasOwnProperty('title')))
        return columns;
      else
        return columns.map(column => {
          let columnName = column.hasOwnProperty('name') ? column.name : (column.hasOwnProperty('title') ? column.title : column);
          column['title'] = columnName;
          column['name'] = columnName;
          return column;
        });
    }
    return columns.map(column => ({ name: column, title: column }));
  }
  return [];
}
export const checkIfObject = (obj) => obj !== null && typeof obj === 'object';
  /* eslintenable */