import { combineReducers } from 'redux';
import countriesReducer from './countries/countriesReducer';
import authReducer from './auth/authReducer';

const rootReducer = combineReducers({
  countries: countriesReducer,
  auth: authReducer,
});

export default rootReducer;
