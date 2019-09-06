import { Map } from 'immutable'
const setData = (state, node , payload)=> state.set(node, payload)

const LoadConfigCommissionIdFunction = (state, payload) => {
	let estado = state.toJS();
	estado.dataId = payload.data;			
	estado.servicesCommission = payload.data.services_commissions;			
	estado.servicesPayment = payload.data.services_payments;			
	estado.dataPatientsStaff = payload.data.data_options;			
	return Map(estado);
}

const setActionProps = (state, payload) => {
	let estado = state.toJS();
	estado.action = payload;		
	return Map(estado);
}

const setPorcentajeTableComisiones = (state, payload) => {
	let estado = state.toJS();	
	const key = estado.servicesPayment.findIndex(service => service.serviceId === payload.id);		
	estado.servicesPayment[key].percentage = payload.value;	
	estado.action = 1;	
	return Map(estado);
}

const setSwitchTableComisiones = (state, payload) => {
	let estado = state.toJS();
	if(payload.tab === "2" && payload.typePersonal !== "5d1776e3b0d4a50b23936710"){
		const key = estado.servicesCommission.findIndex(service => service.serviceId === payload.id);		
		estado.servicesCommission[key].confirm = payload.value;		
	}else if(payload.tab === "3"){
		const key = estado.servicesPayment.findIndex(service => service.serviceId === payload.id);		
		estado.servicesPayment[key].confirm = payload.value;		
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
	if(payload.tab === "2"){
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

const setSwitchAllTableComisiones = (state, payload) => {
	let estado = state.toJS();
	if(payload.tab === "2" && payload.typePersonal !== "5d1776e3b0d4a50b23936710"){		
		estado.servicesCommission.map((commission, i) => {
			commission.confirm = payload.value;
			estado.action = 1;
		})	
	}else if(payload.tab === "3"){
		estado.servicesPayment.map((payment, i) => {
			payment.confirm = payload.value;
			estado.action = 1;
		})	
	}
	
	return Map(estado);
}

const setPorcentajeAllTable = (state, payload) => {
	let estado = state.toJS();	
	estado.servicesPayment.map((payment, i) => {
		payment.percentage = payload.value;
		estado.action = 1;
	})	
	
	return Map(estado);
}

const searchPatientStaffAll = (state, payload) => {
	let estado = state.toJS();
	estado.dataStaffPatientAll = payload;		
	return Map(estado);
}

const searchOnePatientStaff = (state, payload) => {
	console.log("payloaddd", payload)
	let estado = state.toJS();
	let obj = {
		field_1: "patient",
		field_2: payload.type_identity+"-"+payload.dni,
		field_3: payload.names+" "+payload.surnames,
		field_4: payload._id,
	}
	estado.dataPatientsStaff.push(obj);	
	return Map(estado);
}

const searchOneInternalStaff = (state, payload) => {
	let estado = state.toJS();
	estado.dataInternalStaffAll = payload;		
	return Map(estado);
}
const searchOneExternalStaff = (state, payload) => {
	let estado = state.toJS();
	estado.dataExternalStaffAll = payload;		
	return Map(estado);
}

const getOneReferenceInternal = (state, payload) => {
	console.log("payloaddd", payload)
	let estado = state.toJS();
	let obj = {
		field_1: "internal_staff",
		field_2: payload.branchoffices,
		field_3: payload.names+" "+payload.surnames,
		field_4: payload._id
	}
	estado.dataPatientsStaff.push(obj);	
	return Map(estado);
}

const getOneReferenceExternal = (state, payload) => {	
	console.log("payloaddd", payload)
	let estado = state.toJS();
	let obj = {
		field_1: "external_staff",
		field_2: payload.medical_center,
		field_3: payload.branchoffices,
		field_4: payload.branchoffices_id
	}
	estado.dataPatientsStaff.push(obj);	
	return Map(estado);
}

const removerRegisterFunction = (state, payload) => {
	let estado = state.toJS();
	var listDataPatientsStaff = estado.dataPatientsStaff;
	listDataPatientsStaff.splice(payload.key, 1);        
	estado.dataPatientsStaff = listDataPatientsStaff;		
	estado.action = 1;	
	return Map(estado);
}

const cleanDataPatientsStaffs = (state, payload) => {
	let estado = state.toJS();
	estado.dataStaffPatientAll = payload.data;			
	estado.dataInternalStaffAll = payload.data;			
	estado.dataExternalStaffAll = payload.data;			
	estado.dataPatientsStaff = payload.data;			
	estado.action = 0;	
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

  	case "SET_SWITCH_ALL_COMISIONES":
  		return setSwitchAllTableComisiones(state, action.payload);		  

	case "SET_PORCENTAJE_ALL_COMISIONES":
  		return setPorcentajeAllTable(state, action.payload);		  
	
	case "SEARCH_PATIENTS_STAFF_ALL":
		return searchPatientStaffAll(state, action.payload);	
		
	case "SEARCH_ONE_PATIENT_STAFF": 
		return searchOnePatientStaff(state, action.payload);	
		
	case "OPTIONS_INTERNALS":
		return searchOneInternalStaff(state, action.payload);
	
	case "OPTIONS_EXTERNAL":
		return searchOneExternalStaff(state, action.payload);
	
	case "SEARCH_STAFF_INTERNAL_ONE":
		return getOneReferenceInternal(state, action.payload);
	
	case "SEARCH_STAFF_EXTERNAL_ONE":
		return getOneReferenceExternal(state, action.payload);
	
	case "REMOVE_REGISTER":
		return removerRegisterFunction(state, action.payload);
	
	case "CLEAN_DATA_PATIENTS_STAFFS":
		return cleanDataPatientsStaffs(state, action.payload);

	default:
	  	return state;
  }
};

export default ConfigCommissionsReducer;