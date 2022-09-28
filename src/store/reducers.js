import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import userReducer from './user/reducer';
import uploadsReducer from './uploads/reducer'

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  uploads: uploadsReducer,
});

export default reducers;
