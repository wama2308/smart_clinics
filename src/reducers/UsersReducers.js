import { Map } from "immutable";

const setData = (state, node, payload) => state.set(node, payload);

const setStore = (state, payload) => {
  let estado = state.toJS();
  estado.roles.push(payload);
  return Map(estado);
};

const setStoreSaveRolPusher = (state, payload) => {
	let estado = state.toJS();
	estado.roles.push(payload);
	estado.loadSelectRoles.push({ label: payload.rol, value: payload._id });
	return Map(estado);
}

const setStoreEditRolPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.roles.findIndex(rol => rol._id === payload._id);
	estado.roles[key].rol = payload.rol;
	estado.roles[key].modules = payload.modules;	
	estado.loadSelectRoles[key].label = payload.rol; 
	estado.loadSelectRoles[key].value = payload._id; 
	return Map(estado);
}

const setStoreDisabledRolPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.roles.findIndex(rol => rol._id === payload._id);
	estado.roles.splice(key, 1);
	estado.loadSelectRoles.splice(key, 1);
	estado.rolesInactivos.push(payload);		
	return Map(estado);
}

const setStoreEnabledRolPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.rolesInactivos.findIndex(rol => rol._id === payload._id);
	estado.rolesInactivos.splice(key, 1);
	estado.roles.push(payload);
	estado.loadSelectRoles.push({ label: payload.rol, value: payload._id });		
	return Map(estado);
}

const setStoreDeleteInfoEmailUser = (state, payload) => {
  let estado = state.toJS();
  estado.infoEmailUser.data = payload;
  return Map(estado);
};

const setStoreAddSucursal = (state, payload) => {	
  let estado = state.toJS();
  estado.userIdView.sucursal = payload.arraySucursal;
  estado.userIdView.email = payload.email;
  estado.userIdView.names = payload.names;
  estado.userIdView.surnames = payload.surnames;
  estado.userIdView.username = payload.username;
  return Map(estado);
};

const setStoreDeleteSucursal = (state, payload) => {
  let estado = state.toJS();
  var listSucursal = estado.userIdView.sucursal;
  listSucursal.splice(payload, 1);
  estado.userIdView.sucursal = listSucursal;
  return Map(estado);
};

const setStoreDeleteUserIdView = (state, payload) => {
  let estado = state.toJS();
  estado.userIdView.email = payload.email;
  estado.userIdView.names = payload.names;
  estado.userIdView.surnames = payload.surnames;
  estado.userIdView.username = payload.username;
  estado.userIdView.sucursal = payload.sucursal;
  estado.saveRol = 0;
  return Map(estado);
};

const setStoreEditUserView = (state, payload) => {
  let estado = state.toJS();
  estado.userIdView.email = payload.email;
  estado.userIdView.names = payload.names;
  estado.userIdView.surnames = payload.surnames;
  estado.userIdView.username = payload.username;
  estado.userIdView.sucursal = payload.sucursal;
  return Map(estado);
};

const setStoreAddEmail = (state, payload) => {
  let estado = state.toJS();
  estado.userIdView.email = payload;
  return Map(estado);
};

const setStoreAddNombres = (state, payload) => {
  let estado = state.toJS();
  estado.userIdView.names = payload;
  return Map(estado);
};

const setStoreAddApellidos = (state, payload) => {
  let estado = state.toJS();
  estado.userIdView.surnames = payload;
  return Map(estado);
};

const setStoreAddUserName = (state, payload) => {
  let estado = state.toJS();
  estado.userIdView.username = payload;
  return Map(estado);
};

const setStoreUserId = (state, payload) => {
  let estado = state.toJS();
  estado.userId = payload.userId;
  estado.userEmail = payload.userEmail;
  return Map(estado);
};

const setStoreDeleteInfoUserId = (state, payload) => {
  let estado = state.toJS();
  estado.userId = payload;
  estado.userEmail = payload;
  return Map(estado);
};

const setStoreSaveUserPusher = (state, payload) => {
	let estado = state.toJS();
	estado.users.push(payload);	
	return Map(estado);
}

const setStoreEditUserPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.users.findIndex(user => user.id === payload.id);
	estado.users[key].username = payload.username;
	estado.users[key].names = payload.names;	
	estado.users[key].surnames = payload.surnames;			
	estado.users[key].email = payload.email;			
	estado.users[key].estado = payload.estado;			
	return Map(estado);
}

const setStoreDisabledUserPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.users.findIndex(user => user.id === payload.id);
	estado.users.splice(key, 1);	
	estado.usersInactivos.push(payload);		
	return Map(estado);
}

const setStoreEnabledUserPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.usersInactivos.findIndex(user => user.id === payload.id);
	estado.usersInactivos.splice(key, 1);
	estado.users.push(payload);	
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

	  case 'DELETE_DATA_INFO_USER': {
	  	return setStoreDeleteInfoEmailUser(state, action.payload)
	  }

	  case 'LOAD_USER_ID': {
	  	return setStoreEditUserView(state, action.payload)
	  }

	  case 'ADD_SUCURSAL': {
	  	return setStoreAddSucursal(state, action.payload)
	  }

	  case 'DELETE_SUCURSAL': {
	  	return setStoreDeleteSucursal(state, action.payload)
	  }

	  case 'DELETE_USER_ID_VIEW': {
	  	return setStoreDeleteUserIdView(state, action.payload)
	  }

	  case 'ADD_EMAIL_STORE': {
	  	return setStoreAddEmail(state, action.payload)
	  }

	  case 'ADD_NOMBRES_STORE': {
	  	return setStoreAddNombres(state, action.payload)
	  }

	  case 'ADD_APELLIDOS_STORE': {
	  	return setStoreAddApellidos(state, action.payload)
	  }

	  case 'ADD_USERNAME_STORE': {
	  	return setStoreAddUserName(state, action.payload)
	  }

	  case 'LOAD_USUARIO_REGISTRADO_PERSONAL': {
	  	return setStoreUserId(state, action.payload)
	  }

	  case 'DELETE_DATA_INFO_USER_ID': {
	  	return setStoreDeleteInfoUserId(state, action.payload)
	  }

	  case 'LOAD_ROL_NEW_PUSHER': {
	  	return setStoreSaveRolPusher(state, action.payload)
	  }

	  case 'LOAD_ROL_EDIT_PUSHER': {
	  	return setStoreEditRolPusher(state, action.payload)
	  }  

	  case 'LOAD_ROL_DISABLED_PUSHER': {
	  	return setStoreDisabledRolPusher(state, action.payload)
	  }  

	  case 'LOAD_ROL_ENABLED_PUSHER': {
	  	return setStoreEnabledRolPusher(state, action.payload)
	  }

	  case 'LOAD_USER_NEW_PUSHER': {
	  	return setStoreSaveUserPusher(state, action.payload)
	  }

	  case 'LOAD_USER_EDIT_PUSHER': {
	  	return setStoreEditUserPusher(state, action.payload)
	  }

	  case 'LOAD_USER_DISABLED_PUSHER': {
	  	return setStoreDisabledUserPusher(state, action.payload)
	  }

	  case 'LOAD_USER_ENABLED_PUSHER': {
	  	return setStoreEnabledUserPusher(state, action.payload)
	  }

	  default:
	  	return state;
  }
};

export default userReducer;
