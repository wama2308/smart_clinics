import {Map , List} from 'immutable'

//  const setState = (state, newState) => state.mergeDeep(newState);

const setdata = (state,node,payload) =>   state.set(node , Array.isArray(payload)? List(payload) : Map(payload))

// search = (state,node,payload) => state.set(node , payload)

// const setList = (state,node,payload) => {
//    return  state.set(node ,  state.get(node).push(payload))
// }


const authReducer = (state = Map(), action) => {
  switch (action.type) {
  case 'LOGOUT':{
    return setdata(state,'logout', action.users)
  }
  case 'VERIFYING':{
    return setdata(state, 'user' , action.payload)
  }
 
  default:
    return state;
  }
};

export default authReducer;