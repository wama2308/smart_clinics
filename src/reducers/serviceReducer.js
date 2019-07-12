import { Map, List } from "immutable";
const setData = (state, node, payload) => state.set(node, payload);

const deleteModifyServices =(state,values)=>{
  console.log("asdasdasd",state, values)
}

const setStoreEditServicesPusher = (state, payload) => {
	let estado = state.toJS();
	const key = estado.servicios.findIndex(servicios => servicios.serviceId === payload._id);
  console.log("key", key);
  estado.servicios[key].serviceName = payload.name;
  
	return Map(estado);
}


const serviceReducer = (state = Map(), action) => {
  switch (action.type) {
    case "GET_DATA_SERVICE": {
      return Map(action.payload);
    }
    case "GET_DATA_MODAL_SERVICE":
      return setData(state, "ModalService", action.payload);

    // case'EDIT_MEDICAL_SUCURSALES':
    //   return setEdit(state, action.payload)

    case "DELETE_MODIFY_SERVICES":{
      return deleteModifyServices(state, action.payload);
    }
    case "LOAD_SERVICES_EDIT_PUSHER":{
      return setStoreEditServicesPusher(state, action.payload)
    }

    default:
      return state;
  }
};

export default serviceReducer;
