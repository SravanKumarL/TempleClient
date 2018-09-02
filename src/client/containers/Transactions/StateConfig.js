import { getCurrentDate, getDaysOfWeek } from '../../shared/utility';
import { FIELD_TYPES, NAKSHATRAMS, FIELDS, FIELD_PLACEHOLDERS, PAYMENT_MODES, SELECTED_DAYS, DATEPICKER_MODE, CALENDER_MODE } from '../../../store/constants/transactions';
const { PHONE_NUMBER, NAMES, GOTHRAM, NAKSHATRAM, POOJA, PAYMENT_MODE, DATES, NUMBER_OF_DAYS, AMOUNT } = FIELDS;
const { INPUT, DATE, MULTISELECT, RADIO, SINGLESELECT, NUMBER } = FIELD_TYPES;

export const formStateConfig = () => {
  return {
    [PHONE_NUMBER]: createTextField(PHONE_NUMBER, NUMBER, { required: true, minLenght: 8, maxLength: 10 }),
    [NAMES]: createTextField(NAMES, INPUT, { required: true }),
    [GOTHRAM]: createTextField(GOTHRAM, INPUT, { required: true }),
    [NAKSHATRAM]: { ...createSelectField(NAKSHATRAM, MULTISELECT, NAKSHATRAMS), required: false },
    [POOJA]: createSelectField(POOJA, SINGLESELECT, null, '', { required: true }),
    [DATES]: createDate(DATES, DATE, getCurrentDate(), { required: false }),
    [NUMBER_OF_DAYS]: { ...(createTextField(NUMBER_OF_DAYS, INPUT, { required: true }, '1')), valid: true, disabled: true },
    [AMOUNT]: { ...createTextField(AMOUNT, NUMBER, { required: true, minLength: 1 }), disabled: true },
    [PAYMENT_MODE]: { ...(createSelectField(PAYMENT_MODE, RADIO, [PAYMENT_MODES.CASH, PAYMENT_MODES.CHEQUE], PAYMENT_MODES.CASH, { required: true })), valid: true },
  }
}
export const createDate = (field, type, minDate, validation) => {
  const newField = createTextField(field, type, validation, [getCurrentDate()]);
  newField.valid = true;
  newField.minDate = minDate;
  newField[SELECTED_DAYS] = getDaysOfWeek();
  newField[DATEPICKER_MODE] = CALENDER_MODE.SINGLE;
  return newField;
}
export const createTextField = (field, type, validation, defaultValue = '') => {
  const newField = createField(field, type, validation, defaultValue);
  newField.elementConfig.type = 'text';
  return newField;
}
export const createSelectField = (field, type, options, defaultValue, validation) => {
  const newField = createField(field, type, validation);
  newField.elementConfig.options = options;
  newField.value = defaultValue;
  return newField;
}
const createField = (field, type, validation, defaultValue = '') => {
  const newField = {
    elementType: type,
    elementConfig: {
      placeholder: FIELD_PLACEHOLDERS[field]
    },
    value: defaultValue,
    disabled: false,
    valid: false,
    touched: false,
  };
  if (validation) {
    newField.validation = validation;
  }
  return newField;
}