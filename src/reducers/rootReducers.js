import authReducer  from './authReducer'
import configReducer from './configReducer'
import {combineReducers} from 'redux';

export default combineReducers({
    auth : authReducer,
    config: configReducer    
  });