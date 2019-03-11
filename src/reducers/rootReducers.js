import authReducer  from './authReducer'
import {combineReducers} from 'redux';

const auth = authReducer

export default combineReducers({
    auth,
  });