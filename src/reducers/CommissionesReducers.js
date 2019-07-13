import { Map } from 'immutable'

const setDataConfigCommissionsId = (state, node, payload) => {
	let estado = state.toJS();
	estado.shelfs = payload.storeId.shelf;	
	estado.storeId = payload;		
	return Map(estado);
}

const setActionProps = (state, payload) => {
	let estado = state.toJS();
	estado.action = payload;		
	return Map(estado);
}

const setPorcentajeTableComisiones = (state, payload) => {
	let estado = state.toJS();	
	estado.services[payload.pos].percentage = payload.value;	
	estado.action = 1;
	
	return Map(estado);
}

const setSwitchTableComisiones = (state, payload) => {
	let estado = state.toJS();
	estado.services[payload.pos].confirm = payload.value;		
	estado.action = 1;
	
	
	return Map(estado);
}

const ConfigCommissionsReducer = (state = Map(), action) => {
  switch (action.type) {

	case 'LOAD_CONFIG_COMMISSIONS': {
	  	return Map(action.payload)
	  }

	 case 'ACTION_PROPS': {
	  	return setActionProps(state, action.payload)
	  }

	case "SET_PORCENTAJE_COMISIONES":
  		return setPorcentajeTableComisiones(state, action.payload);			

	case "SET_SWITCH_COMISIONES":
  		return setSwitchTableComisiones(state, action.payload);			
	  

	  default:
	  	return state;
  }
};

export default ConfigCommissionsReducer;