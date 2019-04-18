import authReducer  from './authReducer'
import configReducer from './configReducer'
import AplicationReducers from './aplicationReducer'
import {combineReducers} from 'redux';
import serviceReducer from './serviceReducer'
import externalReducer from './externalReducer'
import userReducer from './UsersReducers'
import DistributorReducers from './DistributorReducers'

export default combineReducers({
    auth : authReducer,
    config: configReducer,
    global: AplicationReducers,
    service: serviceReducer,
    usersRoles: userReducer,
    external: externalReducer,
    distributor: DistributorReducers,
  });
