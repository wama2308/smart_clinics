import {Map , List} from 'immutable'

const setState = (state, newState) => state.set(Map(newState));
const setData = (state, node , payload)=> state.set(node, payload)

const setStoreEmailsUsers = (state, payload) => {	
	let estado = state.toJS();
	estado.emailUsers = payload;	
	estado.action = 1;	
	return Map(estado);
}

const setStorePersonalId = (state, payload) => {
	let estado = state.toJS();
	estado.personalId = payload.personalId;	
	estado.userId = payload.personalId.user_id;	
	estado.emailUsers = payload.personalId.emailUser;	
	return Map(estado);
}

const setStoreInfoAction = (state, payload) => {
	let estado = state.toJS();
	estado.action = 0;	
	return Map(estado);
}

const PersonalInternoReducer = (state = Map(), action) => {
  switch (action.type) {
	  case 'LOAD_PERSONAL_CARGOS': {
	  	return Map(action.payload)
	  }	  
	  case 'LOAD_PERSONAL_ID': {
	  	return setStorePersonalId(state, action.payload)
	  }
	  case 'VALIDATE_EMAILS_USERS': {
	  	return setStoreEmailsUsers(state, action.payload)
	  }
	  case 'DELETE_INFO_ACTION': {
	  	return setStoreInfoAction(state, action.payload)
	  }

	  default:
	  	return state;
  }
};

export default PersonalInternoReducer;
