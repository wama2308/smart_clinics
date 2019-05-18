import {Map , List} from 'immutable'
const setData = (state, node , payload)=> state.set(node, payload)

const setDataStoreId = (state, node, payload) => {
	let estado = state.toJS();
	estado.shelfs = payload.storeId.shelf;	
	estado.storeId = payload;		
	return Map(estado);
}

const setStoreAddShelfs = (state, payload) => {
	let estado = state.toJS();
	estado.shelfs.push(payload.objShelfs);		
	return Map(estado);
}

const setStoreDeleteShelfs = (state, payload) => {
	let estado = state.toJS();
	var listShelfs = estado.shelfs;
	listShelfs.splice(payload, 1);        
	estado.shelfs = listShelfs;		
	return Map(estado);
}

const setStoreCleanShelfs = (state, payload) => {
	let estado = state.toJS();
	estado.shelfs = payload.shelfs;		
	return Map(estado);
}

const StoreReducer = (state = Map(), action) => {
  switch (action.type) {

	  case 'LOAD_STORE': {
	  	return Map(action.payload)
	  }

	  case 'LOAD_STORE_ID': {
	  	return setDataStoreId(state, 'storeId', action.payload)
	  }

	  case 'ADD_SHELFS': {
	  	return setStoreAddShelfs(state, action.payload)
	  }

	  case 'DELETE_SHELFS': {
	  	return setStoreDeleteShelfs(state, action.payload)
	  }

	  case 'CLEAN_SHELFS': {
	  	return setStoreCleanShelfs(state, action.payload)
	  }

	  default:
	  	return state;
  }
};

export default StoreReducer;