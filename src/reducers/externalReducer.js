import { Map, List } from "immutable";
const setData = (state, node, payload) => state.set(node, payload);

const externalReducer = (state = Map(), action) => {
  switch (action.type) {
    case "GET_ALL_BRANCHS":
      return setData(state, "allBranchs", action.payload);

    case "ALL_EXTERNAL_STAFF":
      return setData(state, "allExternalStaff", action.payload);

    case "SELECTED_BRANCH_OFFICE":
      return setData(state, "selectedBranchs", action.payload);

    case "VIEW_EXTERNAL_DATA_SELECTED":
      return setData(state, "viewExternalSelected", action.payload);

    default:
      return state;
  }
};

export default externalReducer;
