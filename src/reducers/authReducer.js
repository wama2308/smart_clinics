import {Map , List} from 'immutable'
import AuthState from '../state/authState'

const setState = (state, newState) => state.mergeDeep(Map(newState));

const setdata = (state,node,payload) =>   state.set(node , Array.isArray(payload)? List(payload) : Map(payload))

// search = (state,node,payload) => state.set(node , payload)

// const setList = (state,node,payload) => {
//    return  state.set(node ,  state.get(node).push(payload))
// }

const INITIAL_STATE = AuthState


const authReducer = (state = Map(), action) => {
  switch (action.type) {
  case 'SESION_OFF':{
    return setState(state, {logged: false })
  }
  case 'GET_DATA_USER':{
    return setState(state, action.payload)
  }
  case 'VERIFYING':{
    return setdata(state, 'user' , action.payload)
  }
 
  default:
    return state;
  }
};

export default authReducer;