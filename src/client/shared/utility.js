import moment from 'moment';
import { startCase, toLower } from 'lodash';
export const updateObject = (oldObject, updatedObject) => {
  return {
    ...oldObject,
    ...updatedObject
  };
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

export const getCurrentDate = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  today = `${yyyy}-${mm}-${dd}`;
  return today;
}

export const getDateDifference = (from, to) => {
  const fromDate = moment(from); //todays date
  const toDate = moment(to); // another date
  const duration = moment.duration(toDate.diff(fromDate));
  const days = duration.asDays();
  return days;
}

export const convertToStartCase = (identifier) => {
  return startCase(toLower(identifier));
}

/* eslint-disable */
const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
const number = value =>
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
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined
/* eslint-enable */