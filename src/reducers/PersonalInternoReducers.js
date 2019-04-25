import {Map , List} from 'immutable'

const setState = (state, newState) => state.set(Map(newState));
const setData = (state, node , payload)=> state.set(node, payload)

const setStoreEmailsUsers = (state, payload) => {	
	let estado = state.toJS();
	estado.emailUsers = payload;	
	return Map(estado);
}

const PersonalInternoReducer = (state = Map(), action) => {
  switch (action.type) {
	  case 'LOAD_PERSONAL_CARGOS': {
	  	return Map(action.payload)
	  }	  
	  case 'LOAD_PERSONAL_ID': {
	  	return setData(state, 'dataPersonalId', action.payload)
	  }
	  case 'VALIDATE_EMAILS_USERS': {
	  	return setStoreEmailsUsers(state, action.payload)
	  }

	  default:
	  	return state;
  }
};

export default PersonalInternoReducer;
