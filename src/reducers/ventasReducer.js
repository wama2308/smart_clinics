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
  const products = state.get("array_products");
  let result = products.filter(item => item._id !== payload);
  if (result.length === 0) {
    result = undefined;
  } else {
    result[result.length - 1].searched = undefined;
  }
  return state.set(node, result);
};

const setIn = (state, node, payload) => {
  const result = state.get(node).findIndex(data => {
    return data._id === payload.id;
  });

  return state.setIn(["array_products", result, "quantity"], payload.value);
};

const setField = (state, node, field, payload) => {
  return state.setIn([node, field], payload);
};

const cancelDiscount = (state, payload) => {
  const result = state.toJS();
  delete result.status_sale;
  result.discount.status = payload;
  console.log("aca", result);
  return Map(result);
};

const saveOrDiscountBill = (state, payload) => {
  const json = state.toJS();
  const obj = {
    ...json,
    ...payload
  };

  return Map(obj);
};

const editBill = (state, payload) => {
  const json = state.toJS();
  json.patient = payload.patient;
  json.array_products = payload.supplies;
  delete payload.patient;
  delete payload.supplies;
  const obj = {
    ...json,
    ...payload
  };

  return Map(obj);
};

const cleanAllData = (state, initalState) => {
  const result = state.get("salesList");
  return initalState.set("salesList", result);
};

const completedSale = (state, payload) => {
  const result = state.toJS();
  const obj = { ...result, ...payload };

  console.log("objeto", obj);
  return Map(obj);
};

const setArrayProductos = (state, payload)=>{
    const result = state.toJS()
    if(result.array_products){
      result.array_products.push(payload)
    }else{
      result.array_products = payload
    }

    return Map(result)
}

const initialState = Map({
  loadingSell: true,
  modalReference:false
});

const VentasReducer = (state = initialState, action) => {
  switch (action.type) {

    case "SEARCH_ARRAY_PRODUCTS":{
      return setArrayProductos(state, action.payload)
    }

    case "SEARCH_PATIENT": {
      return setData(state, "patient", action.payload);
    }
    case "SEARCH_PRODUCT":
      return setData(state, "products", action.payload);
    case "CLEAN": {
      return setData(state, "patient", action.payload);
    }

    case "CLEAN_TABLE": {
      return cleanAllData(state, initialState);
    }

    case "SEARCH_ONE_PRODUCTS": {
      return setList(state, "array_products", action.payload);
    }
    case "PATIENT_OPTIONS": {
      return setData(state, "options_patient", action.payload);
    }

    case "OPTIONS_INTERNALS":
      return setData(state, "options_internal", action.payload);

    case "OPTIONS_EXTERNAL":
      return setData(state, "options_external", action.payload);

    case "DELETE_ITEM": {
      return remove(state, "array_products", action.payload);
    }

    case "CHANGE_QUANTY_TO_SELL": {
      return setIn(state, "array_products", action.payload);
    }

    case "APPROVERS_DISCOUNT": {
      return setData(state, "approversList", action.payload);
    }

    case "SALES_LIST": {
      return setData(state, "salesList", action.payload);
    }

    case "EDIT_ALL_BILL":
      return editBill(state, action.payload);

    case "ALL_SELL_LOADING":
      return setData(state, "loadingSell", action.payload);

    case "SET_DATA_DISCOUNT":
      return saveOrDiscountBill(state, action.payload);

    case "DISCOUNT_CANCELLED":
      return cancelDiscount(state, action.payload);

    case "SELL_COMPLETED":
      return completedSale(state, action.payload);

    case "OPEN_MODAL_REFERENCE":{
      return setData(state , "modalReference" , action.payload)
    }

    case "SET_REFERENCES":{
      return setData(state, "references", action.payload)
    }

    default:
      return state;
  }
};

export default VentasReducer;
