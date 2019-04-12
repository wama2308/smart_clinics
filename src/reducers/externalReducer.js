import { Map, List } from "immutable";
const setData = (state, node, payload) => state.set(node, payload);

const externalReducer = (state = Map(), action) => {
  switch (action.type) {
    case "GET_ALL_BRANCHS":
      return setData(state, "allBranchs", action.payload);

    // case'EDIT_MEDICAL_SUCURSALES':
    //   return setEdit(state, action.payload)

    default:
      return state;
  }
};

export default externalReducer;
