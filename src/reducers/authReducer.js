import { Map, List } from "immutable";

const setState = (state, newState) => state.mergeDeep(Map(newState));

const setData = (state, node, payload) => state.set(node, payload);

// search = (state,node,payload) => state.set(node , payload)

// const setList = (state,node,payload) => {
//    return  state.set(node ,  state.get(node).push(payload))
// }

const setObject = (state, payload) => {
  const result = state.toJS();
  return Map({ ...result, ...payload });
};

const authReducer = (state = Map(), action) => {
  switch (action.type) {
    case "SESION_OFF": {
      return Map();
    }
    case "GET_DATA_USER": {
      return setState(state, action.payload);
    }

    case "NEW_STEP": {
      return setData(state, "authStep", action.payload);
    }
    case "VERIFYING": {
      return setData(state, "user", action.payload);
    }

    case "LOAD_SECRECT_QUESTIONS": {
      return setData(state, "secretQuestion", action.payload);
    }

    case "SET_TYPE_USER": {
      return setData(state, "typeUser", action.payload);
    }

    case "USERS_PERMISS": {
      return setObject(state, action.payload);
    }

    default:
      return state;
  }
};

export default authReducer;
