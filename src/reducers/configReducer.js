import { Map, List } from "immutable";

const setState = (state, newState) => state.set();
const setData = (state, node, payload) => state.set(node, payload);

const setEdit = (state, newData) => {
  state = state.toJS();
  state.branchoffices = newData;

  return Map(state);
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
    default:
      return state;
  }
};

export default configReducer;
