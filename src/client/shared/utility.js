import moment from 'moment';
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
    isValid = value.trim() !== '' && isValid;
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