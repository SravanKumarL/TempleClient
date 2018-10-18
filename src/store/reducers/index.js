import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import transactions from './transactions';
import { entity } from './entity';
import datePicker from './datepicker';
import ManagementReport from './managementReport';
import constants from '../sagas/constants';
import nativeDatePicker from './nativeDatePicker';
export default combineReducers({
  auth,
  form,
  transactions,
  [constants.Poojas]: entity(constants.Poojas),
  [constants.Reports]: entity(constants.Reports),
  [constants.Users]: entity(constants.Users),
  datePicker,
  nativeDatePicker,
  ManagementReport
});