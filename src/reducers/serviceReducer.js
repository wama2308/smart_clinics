import { Map, List } from "immutable";
const setData = (state, node, payload) => state.set(node, payload);

const deleteServices = (state, values) => {
  const json = state.getIn(["ModalService", "serviceOriginal"]);
  json["fields"] = json["fields"].filter(field => {
    return field._id !== values.field_id;
  });

  state.setIn(["ModalService", "serviceOriginal"], json);

  return Map(state.toJS());
};

const editFieldService = (state, values) => {
  const json = state.getIn(["ModalService", "serviceOriginal"]);
  const index = json["fields"].findIndex(field => {
    return field._id === values.field._id;
  });

  const result = state.toJS();
  result.ModalService.serviceOriginal.fields[index] = values.field;
  return Map(result);
};

const serviceReducer = (state = Map(), action) => {
  switch (action.type) {
    case "GET_DATA_SERVICE": {
      return Map(action.payload);
    }
    case "GET_DATA_MODAL_SERVICE":
      return setData(state, "ModalService", action.payload);

    case "DELETE_FIELD": {
      return deleteServices(state, action.payload);
    }
    // case "LOAD_SERVICES_EDIT_PUSHER":{
    //   return setStoreEditServicesPusher(state, action.payload)
    // }

    case "EDIT_FIELD": {
      return editFieldService(state, action.payload);
    }
    default:
      return state;
  }
};

export default serviceReducer;
