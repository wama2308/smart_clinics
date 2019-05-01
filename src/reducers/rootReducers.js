import authReducer  from './authReducer'
import configReducer from './configReducer'
import AplicationReducers from './aplicationReducer'
import {combineReducers} from 'redux';
import serviceReducer from './serviceReducer'
import userReducer from './UsersReducers'
import DistributorReducers from './DistributorReducers'
import PersonalInternoReducers from './PersonalInternoReducers'

export default combineReducers({
    auth : authReducer,
    config: configReducer,
    global: AplicationReducers,
    service: serviceReducer,
    usersRoles: userReducer,
    distributor: DistributorReducers,
    personaInterno: PersonalInternoReducers,
 });