import {Map , List} from 'immutable'

const setState = (state, newState) => state.set(Map(newState));
const setData = (state, node , payload)=> state.set(node, payload)

const PersonalInternoReducer = (state = Map(), action) => {
  switch (action.type) {
	  case 'LOAD_PERSONAL_CARGOS': {
	  	return Map(action.payload)
	  }	  

	  default:
	  	return state;
  }
};

export default PersonalInternoReducer;
