import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import transactions from './transactions';
import {entity} from './entity';
export default combineReducers({
  auth,
  form,
  transactions,
  poojas:entity('poojas'),
  reports:entity('reports'),
  users:entity('users')
});