import { Map, List } from "immutable";
const setData = (state, node, payload) => state.set(node, payload);

const VentasReducer = (state = Map(), action) => {
  switch (action.type) {
    case "SEARCH_PATIENT":
      return setData(state, "patient", action.payload);

    case "SEARCH_PRODUCT":
      return setData(state, "products", action.payload);


    case "CLEAN":{
      return setData(state, "patient", action.payload )
    }
    default:
      return state;
  }
};

export default VentasReducer;
