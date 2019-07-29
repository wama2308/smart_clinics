import { Map } from "immutable";

const setData = (state, node, payload) => state.set(node, payload);

const calendarReducer = (state = Map(), action) => {
  switch (action.type) {
    case "GET_AGENDA": {
      return setData(state, "events", action.payload);
    }

    default:
      return state;
  }
};

export default calendarReducer;
