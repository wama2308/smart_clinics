import { Map } from 'immutable'

const setDataStoreId = (state, node, payload) => {
	let estado = state.toJS();
	estado.shelfs = payload.storeId.shelf;	
	estado.storeId = payload;		
	return Map(estado);
}

const setStoreAddShelfs = (state, payload) => {
	let estado = state.toJS();
	estado.shelfs.push(payload.objShelfs);		
	estado.action = 1;
	return Map(estado);
}

const setStoreDeleteShelfs = (state, payload) => {
	let estado = state.toJS();
	var listShelfs = estado.shelfs;
	listShelfs.splice(payload, 1);        
	estado.shelfs = listShelfs;		
	estado.action = 1;
	return Map(estado);
}

const setStoreCleanShelfs = (state, payload) => {
	let estado = state.toJS();
	estado.shelfs = payload.shelfs;		
	estado.action = 0;
	estado.storeId = {};
	return Map(estado);
}

const setActionProps = (state, payload) => {
	let estado = state.toJS();
	estado.action = payload;		
	return Map(estado);
}

const setStoreSavePusher = (state, payload) => {
	let estado = state.toJS();
	estado.data.push(payload);	
	return Map(estado);
}

const setStoreEditPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.data.findIndex(store => store._id === payload._id);
	estado.data[key].name = payload.name;
	estado.data[key].description = payload.description;	
	estado.data[key].branchoffices = payload.branchoffices;			
	estado.data[key].shelf = payload.shelf;				
	return Map(estado);
}

const setStoreDisabledPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.data.findIndex(store => store._id === payload._id);
	estado.data.splice(key, 1);	
	estado.storeInactivos.push(payload);		
	return Map(estado);
}

const setStoreEnabledPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.storeInactivos.findIndex(store => store._id === payload._id);
	estado.storeInactivos.splice(key, 1);
	estado.data.push(payload);	
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

	  case 'ACTION_PROPS': {
	  	return setActionProps(state, action.payload)
	  }

	  case 'LOAD_STORE_NEW_PUSHER': {
	  	return setStoreSavePusher(state, action.payload)
	  }

	  case 'LOAD_STORE_EDIT_PUSHER': {
	  	return setStoreEditPusher(state, action.payload)
	  }

	  case 'LOAD_STORE_DISABLED_PUSHER': {
	  	return setStoreDisabledPusher(state, action.payload)
	  }

	  case 'LOAD_STORE_ENABLED_PUSHER': {
	  	return setStoreEnabledPusher(state, action.payload)
	  }

	  default:
	  	return state;
  }
};

export default StoreReducer;