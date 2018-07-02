import { getCurrentDate } from '../../shared/utility';
import { FIELD_TYPES, NAKSHATRAMS, FIELDS, FIELD_PLACEHOLDERS, PAYMENT_MODES } from '../../../store/constants/transactions';
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
    [NUMBER_OF_DAYS]: { ...(createTextField(NUMBER_OF_DAYS, INPUT, { required: true })), valid: true, disabled: true },
    [AMOUNT]: { ...createTextField(AMOUNT, NUMBER, { required: true, minLength: 1 }), disabled: true },
    [PAYMENT_MODE]: { ...(createSelectField(PAYMENT_MODE, RADIO, [PAYMENT_MODES.CASH, PAYMENT_MODES.CHEQUE], PAYMENT_MODES.CASH, { required: true })), valid: true },
  }
}
export const createDate = (field, type, minDate, validation) => {
  const newField = createTextField(field, type, validation);
  newField.minDate = minDate;
  newField.value = [];
  return newField;
}
export const createTextField = (field, type, validation) => {
  const newField = createField(field, type, validation);
  newField.elementConfig.type = 'text';
  return newField;
}
export const createSelectField = (field, type, options, defaultValue, validation) => {
  const newField = createField(field, type, validation);
  newField.elementConfig.options = options;
  newField.value = defaultValue;
  return newField;
}
const createField = (field, type, validation) => {
  const newField = {
    elementType: type,
    elementConfig: {
      placeholder: FIELD_PLACEHOLDERS[field]
    },
    value: '',
    disabled: false,
    valid: false,
    touched: false,
  };
  if (validation) {
    newField.validation = validation;
  }
  return newField;
}