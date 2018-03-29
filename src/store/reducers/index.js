import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import transactions from './transactions';
import {entity} from './entity';
const poojas=entity();
const reports=entity();
export default combineReducers({
  auth,
  form,
  transactions,
  poojas,
  reports
});