import {Map} from 'immutable'

const setDataDistributorId = (state, payload) => {
	let estado = state.toJS();
	estado.contacs = payload.distributorId.contacts;	
	estado.distributorId = payload.distributorId;	
	estado.tableContac = 1;	
	return Map(estado);
}

const setStoreAddContacto = (state, payload) => {
	let estado = state.toJS();
	estado.contacs.push(payload.objContacto);	
	estado.tableContac = 1;	
	estado.action = 1;	
	return Map(estado);
}

const setStoreDeleteContacto = (state, payload) => {
	let estado = state.toJS();
	var listContacs = estado.contacs;
	listContacs.splice(payload, 1);        
	estado.contacs = listContacs;		
	estado.action = 1;	
	return Map(estado);
}

const setStoreCleanConstacs = (state, payload) => {
	let estado = state.toJS();
	estado.contacs = payload.contacs;	
	estado.distributorId = {};	
	estado.tableContac = 0;	
	estado.action = 0;	
	return Map(estado);
}

const setActionProps = (state, payload) => {
	let estado = state.toJS();
	estado.action = payload;		
	return Map(estado);
}

const setStoreSaveProviderPusher = (state, payload) => {
	let estado = state.toJS();
	estado.data.push(payload);	
	return Map(estado);
}

const setStoreEditProviderPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.data.findIndex(provider => provider.id === payload.id);
	estado.data[key].address = payload.address;
	estado.data[key].email = payload.email;	
	estado.data[key].name = payload.name;	
	estado.data[key].phone = payload.phone;	
	estado.data[key].tin = payload.tin;	
	estado.data[key].typeIdentity = payload.typeIdentity;		
	
	return Map(estado);
}

const setStoreDisabledProviderPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.data.findIndex(provider => provider.id === payload.id);
	estado.data.splice(key, 1);	
	estado.proveedoresInactivos.push(payload);		
	return Map(estado);
}

const setStoreEnabledProviderPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.proveedoresInactivos.findIndex(provider => provider.id === payload.id);
	estado.proveedoresInactivos.splice(key, 1);
	estado.data.push(payload);	
	return Map(estado);
}

const distributorReducer = (state = Map(), action) => {
  switch (action.type) {

	  case 'LOAD_DISTRIBUTOR': {
	  	return Map(action.payload)
	  }

	  case 'LOAD_DISTRIBUTOR_ID': {
	  	return setDataDistributorId(state, action.payload)
	  }

	  case 'ADD_CONTACTO': {
	  	return setStoreAddContacto(state, action.payload)
	  }

	  case 'DELETE_CONTACTO': {
	  	return setStoreDeleteContacto(state, action.payload)
	  }

	  case 'CLEAN_CONTACS': {
	  	return setStoreCleanConstacs(state, action.payload)
	  }

	  case 'LOAD_PROVIDER_NEW_PUSHER': {
	  	return setStoreSaveProviderPusher(state, action.payload)
	  }

	  case 'LOAD_PROVIDER_EDIT_PUSHER': {
	  	return setStoreEditProviderPusher(state, action.payload)
	  }

	  case 'LOAD_PROVIDER_DISABLED_PUSHER': {
	  	return setStoreDisabledProviderPusher(state, action.payload)
	  }

	  case 'LOAD_PROVIDER_ENABLED_PUSHER': {
	  	return setStoreEnabledProviderPusher(state, action.payload)
	  }

	  case 'ACTION_PROPS': {
	  	return setActionProps(state, action.payload)
	  }

	  default:
	  	return state;
  }
};

export default distributorReducer;