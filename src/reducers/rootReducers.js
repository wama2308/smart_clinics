import authReducer  from './authReducer'
import configReducer from './configReducer'
import AplicationReducers from './aplicationReducer'
import {combineReducers} from 'redux';
import serviceReducer from './serviceReducer'

export default combineReducers({
    auth : authReducer,
    config: configReducer,
    global: AplicationReducers,
    service: serviceReducer
  });
