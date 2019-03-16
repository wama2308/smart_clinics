import { Map, List } from "immutable";

const setState = (state, newState) => state.set();
const setData = (state, node , payload ) => state.set( node , payload);

const configReducer = (state = Map(), action) => {
  switch (action.type) {
    case "LOAD_MEDICAL_CENTER": {
      return Map(action.payload);
    }
    case "SET_TYPE_CONFIGURATION":
      console.log(action.payload) 
    return setData(state, 'typeConfig', action.payload);
    default:
      return state;
  }
};

export default configReducer;
