import {Map , List} from 'immutable'

const setState = (state, newState) => state.set(Map(newState));
const setData = (state, node , payload)=> state.set(node, payload)

const setStore = (state, payload) => {
	let estado = state.toJS();
	estado.roles.push(payload);
	return Map(estado);
}

const setStoreDeleteInfoEmailUser = (state, payload) => {
	let estado = state.toJS();
	estado.infoEmailUser.data = payload;
	return Map(estado);
}

const userReducer = (state = Map(), action) => {
  switch (action.type) {

	  case 'LOAD_USERS_ROLES': {
	  	return Map(action.payload)
	  }

	  case 'LOAD_ROL_ID': {
	  	return setData(state, 'rolIdView', action.payload)
	  }

	  case 'LOAD_EMAIL_INFO_USER': {
	  	return setData(state, 'infoEmailUser', action.payload)
	  }

	  case 'LOAD_ROL_NEW': {
	  	//console.log("store",state.toJS());
	  	return setStore(state, action.payload)
	  }

	  case 'DELETE_DATA_INFO_USER': {
	  	//console.log("store",state.toJS());
	  	return setStoreDeleteInfoEmailUser(state, action.payload)
	  }

	  default:
	  	return state;
  }
};

export default userReducer;
