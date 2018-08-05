export const FIELDS = {
    PHONE_NUMBER: 'phoneNumber',
    NAMES: 'names',
    GOTHRAM: 'gothram',
    NAKSHATRAM: 'nakshatram',
    DATES: 'selectedDates',
    CHEQUE_NO: 'chequeNo',
    BANK_NAME: 'bankName',
    POOJA: 'pooja',
    OTHERS: 'others',
    PAYMENT_MODE: 'paymentMode',
    NUMBER_OF_DAYS: 'numberOfDays',
    AMOUNT: 'amount',
    ID: 'id',
}
export const SELECTED_DAYS = 'selectedDays';
export const DATEPICKER_MODE='datepickerMode';
export const FIELD_PLACEHOLDERS = {
    phoneNumber: 'Phone Number',
    names: 'Names',
    gothram: 'Gothram',
    nakshatram: 'Nakshatram',
    selectedDates: 'Selected date(s)',
    chequeNo: 'Cheque No',
    bankName: 'Bank Name',
    pooja: 'Pooja',
    others: 'Special Offerings',
    paymentMode: 'Payment Mode',
    numberOfDays: 'Number of Days',
    amount: 'Amount',
    id: 'Id',
};

export const PAYMENT_MODES = {
    CASH: 'cash',
    CHEQUE: 'cheque',
}

export const SEARCH_OPERATIONS = {
    USE: 'use',
    EDIT: 'edit',
}
export const FIELD_TYPES = {
    SINGLESELECT: 'single',
    INPUT: 'input',
    NUMBER: 'number',
    RADIO: 'radioGroup',
    MULTISELECT: 'multi',
    DATE: 'date',
    TEXTAREA: 'textarea',
}
export const CALENDER_MODE = {
    RANGE: 'range',
    SINGLE: 'single',
    MULTIPLE: 'multiple'
};

export const TABS = {
    OTHERS: 'others',
    POOJAS: 'pooja',
}

export const NAKSHATRAMS = [
    { label: 'Ashwini' },
    { label: 'Bharani' },
    { label: 'Kritika' },
    { label: 'Rohini' },
    { label: 'Mrugasira' },
    { label: 'Arudra' },
    { label: 'Punarvasu' },
    { label: 'Pushyami' },
    { label: 'Aslesha' },
    { label: 'Makha' },
    { label: 'Pubba' },
    { label: 'Uttara' },
    { label: 'Hasta' },
    { label: 'Chitta' },
    { label: 'Swati' },
    { label: 'Vishaka' },
    { label: 'Anuradha' },
    { label: 'Jyesta' },
    { label: 'Moola' },
    { label: 'Purvashada' },
    { label: 'Uttarashada' },
    { label: 'Sravana' },
    { label: 'Dhanista' },
    { label: 'Satabisha' },
    { label: 'Purvabhadra' },
    { label: 'Uttarabhadra' },
    { label: 'Revati' },
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
}));;
