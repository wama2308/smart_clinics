import { Map, List } from "immutable";
const setData = (state, node, payload) => state.set(node, payload);

const deleteModifyServices =(state,values)=>{
  console.log("asdasdasd",state, values)
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

    default:
      return state;
  }
};

export default serviceReducer;
