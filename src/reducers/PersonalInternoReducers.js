import {Map} from 'immutable'

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
	estado.emailUsers = [];	
	return Map(estado);
}

const setStoreSavePositionsPusher = (state, payload) => {
	let estado = state.toJS();
	estado.cargos.push(payload);	
	return Map(estado);
}

const setStoreEditPositionsPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.cargos.findIndex(cargo => cargo.value === payload.value);
	estado.cargos[key].label = payload.label;
	estado.cargos[key].value = payload.value;	
	estado.cargos[key].description = payload.description;			
	return Map(estado);
}

const setStoreDisabledPositionsPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.cargos.findIndex(cargo => cargo.value === payload.value);
	estado.cargos.splice(key, 1);	
	estado.cargosInactivos.push(payload);		
	return Map(estado);
}

const setStoreEnabledPositionsPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.cargosInactivos.findIndex(cargo => cargo.value === payload.value);
	estado.cargosInactivos.splice(key, 1);
	estado.cargos.push(payload);	
	return Map(estado);
}

const setStoreSaveInternalStaffPusher = (state, payload) => {
	let estado = state.toJS();
	estado.personal.push(payload);	
	return Map(estado);
}

const setStoreEditInternalStaffPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.personal.findIndex(personal => personal._id === payload._id);
	estado.personal[key].type_identity = payload.type_identity;
	estado.personal[key].dni = payload.dni;	
	estado.personal[key].names = payload.names;			
	estado.personal[key].surnames = payload.surnames;			
	estado.personal[key].phone = payload.phone;			
	estado.personal[key].email = payload.email;			
	estado.personal[key].entry_date = payload.entry_date;			
	estado.personal[key].positions = payload.positions;			
	estado.personal[key].branchoffices_register = payload.branchoffices_register;			
	return Map(estado);
}

const setStoreDisabledInternalStaffPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.personal.findIndex(personal => personal._id === payload._id);
	estado.personal.splice(key, 1);	
	estado.personalInactivo.push(payload);		
	return Map(estado);
}

const setStoreEnabledInternalStaffPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.personalInactivo.findIndex(personal => personal._id === payload._id);
	estado.personalInactivo.splice(key, 1);
	estado.personal.push(payload);	
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

	  case 'LOAD_POSITIONS_NEW_PUSHER': {
	  	return setStoreSavePositionsPusher(state, action.payload)
	  }

	  case 'LOAD_POSITIONS_EDIT_PUSHER': {
	  	return setStoreEditPositionsPusher(state, action.payload)
	  }

	  case 'LOAD_POSITIONS_DISABLED_PUSHER': {
	  	return setStoreDisabledPositionsPusher(state, action.payload)
	  }

	  case 'LOAD_POSITIONS_ENABLED_PUSHER': {
	  	return setStoreEnabledPositionsPusher(state, action.payload)
	  }

	  case 'LOAD_INTERNAL_STAFF_NEW_PUSHER': {
	  	return setStoreSaveInternalStaffPusher(state, action.payload)
	  }

	  case 'LOAD_INTERNAL_STAFF_EDIT_PUSHER': {
	  	return setStoreEditInternalStaffPusher(state, action.payload)
	  }

	  case 'LOAD_INTERNAL_STAFF_DISABLED_PUSHER': {
	  	return setStoreDisabledInternalStaffPusher(state, action.payload)
	  }

	  case 'LOAD_INTERNAL_STAFF_ENABLED_PUSHER': {
	  	return setStoreEnabledInternalStaffPusher(state, action.payload)
	  }

	  default:
	  	return state;
  }
};

export default PersonalInternoReducer;
