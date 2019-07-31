import { Map } from 'immutable'

const LoadConfigCommissionIdFunction = (state, payload) => {
	let estado = state.toJS();
	estado.dataId = payload.data;			
	estado.servicesCommission = payload.data.services_commissions;			
	estado.servicesPayment = payload.data.services_payments;			
	return Map(estado);
}

const setActionProps = (state, payload) => {
	let estado = state.toJS();
	estado.action = payload;		
	return Map(estado);
}

const setPorcentajeTableComisiones = (state, payload) => {
	let estado = state.toJS();	
	estado.servicesPayment[payload.pos].percentage = payload.value;	
	estado.action = 1;
	
	return Map(estado);
}

const setSwitchTableComisiones = (state, payload) => {
	let estado = state.toJS();
	if(payload.tab === "1" && payload.typePersonal !== "5d1776e3b0d4a50b23936710"){
		estado.servicesCommission[payload.pos].confirm = payload.value;		
	}else if(payload.tab === "2"){
		estado.servicesPayment[payload.pos].confirm = payload.value;		
	}
	estado.action = 1;	
	return Map(estado);
}
const setCleanListServices = (state, payload) => {
	let estado = state.toJS();
	estado.action = 0;
	estado.servicesCommission.map((service, i) => {
		service.percentage = payload.percentaje;
		service.confirm = payload.confirm;
	})	
	estado.servicesPayment.map((service, i) => {
		service.percentage = payload.percentaje;
		service.confirm = payload.confirm;
	})	
	
	return Map(estado);
}

const setCleanListServicesTab = (state, payload) => {
	let estado = state.toJS();
	estado.action = 0;
	if(payload.tab === "1"){
		estado.servicesCommission.map((service, i) => {
			service.percentage = payload.percentaje;
			service.confirm = payload.confirm;
		})
	}else{
		estado.servicesPayment.map((service, i) => {
			service.percentage = payload.percentaje;
			service.confirm = payload.confirm;
		})		
	}
		
	
	
	return Map(estado);
}

const ConfigCommissionsReducer = (state = Map(), action) => {
  switch (action.type) {

	case 'LOAD_CONFIG_COMMISSIONS': 
	  	return Map(action.payload)	  

  	case 'LOAD_CONFIG_COMMISSION_ID': 
	  	return LoadConfigCommissionIdFunction(state, action.payload)	

	case 'ACTION_PROPS': 
	  	return setActionProps(state, action.payload)	

  	case 'CLEAN_LIST_SERVICES': 
	  	return setCleanListServices(state, action.payload)	

  	case 'CLEAN_LIST_SERVICES_TAB': 
	  	return setCleanListServicesTab(state, action.payload)	

	case "SET_PORCENTAJE_COMISIONES":
  		return setPorcentajeTableComisiones(state, action.payload);				

	case "SET_SWITCH_COMISIONES":
  		return setSwitchTableComisiones(state, action.payload);				  

	default:
	  	return state;
  }
};

export default ConfigCommissionsReducer;