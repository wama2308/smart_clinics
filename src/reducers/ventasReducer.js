import { Map, List } from "immutable";

const setData = (state, node, payload) => state.set(node, payload);
const setList = (state, node, payload) => {
  const array = [];
  const prevState = state.get("array_products");
  if (!prevState) {
    array.push(payload);
    return state.set(node, array);
  }
  array.push(...prevState, payload);
  return state.set(node, array);
};

const remove = (state, node, payload) => {
  let result = state.get(node).filter(item => item._id !== payload);
  result = result.length === 0 ? undefined : result;
  return state.set(node, result);
};

const setIn = (state, node, payload) => {
  const result = state.get(node).findIndex(data => {
    return data._id === payload.id;
  });

  return state.setIn(["array_products", result, "quantyToSell"], payload.value);
};

const VentasReducer = (state = Map(), action) => {
  switch (action.type) {
    case "SEARCH_PATIENT": {
      return setData(state, "patient", action.payload);
    }
    case "SEARCH_PRODUCT":
      return setData(state, "products", action.payload);
    case "CLEAN": {
      return setData(state, "patient", action.payload);
    }
    case "SEARCH_ONE_PRODUCTS": {
      return setList(state, "array_products", action.payload);
    }
    case "PATIENT_OPTIONS": {
      return setData(state, "options_patient", action.payload);
    }
    case "DELETE_ITEM": {
      return remove(state, "array_products", action.payload);
    }

    case "CHANGE_QUANTY_TO_SELL": {
      return setIn(state, "array_products", action.payload);
    }
    default:
      return state;
  }
};

export default VentasReducer;
