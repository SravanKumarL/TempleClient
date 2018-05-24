import { getCurrentDate } from '../../shared/utility';

export const formStateConfig = () => {
  return {
    phoneNumber: {
      elementType: 'number',
      elementConfig: {
        type: 'text',
        placeholder: 'Phone Number',
      },
      value: '',
      validation: {
        required: true,
        minLength: 8,
        maxLength: 10
      },
      valid: false,
      disabled: false,
      touched: false,
    },
    names: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Names',
      },
      validation: {
        required: true,
      },
      value: '',
      disabled: false,
      valid: false,
      touched: false,
    },
    gothram: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Gothram',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      disabled: false,
      touched: false,
    },
    nakshatram: {
      elementType: 'multiselect',
      elementConfig: {
        type: 'text',
        placeholder: 'Nakshatram',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      disabled: false,
      touched: false,
    },
    pooja: {
      elementType: 'singleselect',
      elementConfig: {
        options: [],
        placeholder: 'Pooja'
      },
      value: '',
      disabled: false,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    selectedDates: {
      elementType: 'date',
      elementConfig: {
        type: 'text',
        placeholder: 'Selected date(s)',
      },
      value: [],
      minDate: getCurrentDate(),
      validation: {
        required: false,
      },
      valid: true,
      disabled: false,
      touched: false,
    },
    numberOfDays: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'No of Days',
      },
      value: 1,
      validation: {
        required: true,
      },
      valid: true,
      disabled: true,
      touched: false,
    },
    amount: {
      elementType: 'number',
      elementConfig: {
        type: 'text',
        placeholder: 'Amount',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: true,
      disabled: true,
      touched: false,
    },
    modeOfPayment: {
      elementType: 'radioGroup',
      elementConfig: {
        options: ['cash', 'cheque'],
        placeholder: 'Mode'
      },
      value: 'cash',
      disabled: false,
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
  }
}