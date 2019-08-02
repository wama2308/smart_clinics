import { Map, List } from "immutable";

const setState = (state, newState) => state.set();
const setData = (state, node, payload) => state.set(node, payload);

const setEdit = (state, newData) => {
  state = state.toJS();
  state.branchoffices = newData;

  return Map(state);
};

const addCheck = (state, payload) => {
  const result = state.get("allService");

  const index = result.findIndex(data => {
    return data.serviceId === payload;
  });
  result[index].confirm = !result[index].confirm;
  const newState = state.toJS();
  newState.allService = result;

   return Map(newState)
};

const configReducer = (state = Map(), action) => {
  switch (action.type) {
    case "LOAD_MEDICAL_CENTER": {
      return Map(action.payload);
    }
    case "SET_TYPE_CONFIGURATION":
      return setData(state, "typeConfig", action.payload);

    case "EDIT_MEDICAL_SUCURSALES":
      return setEdit(state, action.payload);

    case "SET_DATA_BRACHN_OFFICE": {
      return setEdit(state, action.payload);
    }

    case "GET_ALL_SERVICE": {
      return setData(state, "allService", action.payload);
    }

    case "ADD_SERVICE": {
      return addCheck(state, action.payload);
    }
    default:
      return state;
  }
};

export default configReducer;
