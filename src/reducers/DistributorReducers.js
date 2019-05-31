import {Map} from 'immutable'

const setDataDistributorId = (state, node, payload) => {
	let estado = state.toJS();
	estado.contacs = payload.distributorId.contacts;	
	estado.distributorId = payload;	
	estado.tableContac = 1;	
	return Map(estado);
}

const setStoreAddContacto = (state, payload) => {
	let estado = state.toJS();
	estado.contacs.push(payload.objContacto);	
	estado.tableContac = 1;	
	return Map(estado);
}

const setStoreDeleteContacto = (state, payload) => {
	let estado = state.toJS();
	var listContacs = estado.contacs;
	listContacs.splice(payload, 1);        
	estado.contacs = listContacs;		
	return Map(estado);
}

const setStoreCleanConstacs = (state, payload) => {
	let estado = state.toJS();
	estado.contacs = payload.contacs;	
	estado.tableContac = 0;	
	return Map(estado);
}

const distributorReducer = (state = Map(), action) => {
  switch (action.type) {

	  case 'LOAD_DISTRIBUTOR': {
	  	return Map(action.payload)
	  }

	  case 'LOAD_DISTRIBUTOR_ID': {
	  	return setDataDistributorId(state, 'distributorId', action.payload)
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

	  default:
	  	return state;
  }
};

export default distributorReducer;