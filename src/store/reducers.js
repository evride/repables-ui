import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import userReducer from './user/reducer';

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default reducers;
