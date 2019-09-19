import { Map } from 'immutable'
import { deleteDataSupplies, queryOneBelongingFunction } from '../actions/bedroomsActions';

const loadbedroons = (state, payload) => {
  let estado = state.toJS();
  estado.bedroomsEnabled = payload.enabled
  estado.bedroomsDisabled = payload.disabled
  estado.dataAccept = []
  return Map(estado);
}

const loadOneBedroons = (state, payload) => {
  let estado = state.toJS();
  const array = []
  payload.loadOneTurnos.supplies.map(data => {
    array.push({
      ...data,
      cantidad: data.quantity_stock
    })
  })
  estado.bedroomsOne = {
    ...payload.loadOneTurnos,
    supplies: array
  }

  return Map(estado);
}

const searchSupplies = (state, payload) => {
  let estado = state.toJS();
  estado.searchSupplies = payload
  return Map(estado);
}

const acceptData = (state, payload) => {
  let estado = state.toJS();
  estado.dataAccept.push({
    name: payload.label,
    _id: payload._id,
    code: payload.code,
    quantity: 0
  })
  return Map(estado);
}

const setSuppliesData = (state, payload) => {
  let estado = state.toJS();

  if (payload.option === 1) {
    estado.dataAccept.map(data => {
      if (payload.data >= 0 && payload.data <= data.quantity) {
        if (data._id === payload.id) {
          data.cantidad = parseInt(payload.data)
        }
      }
    })
  } else if (payload.option === 3) {
    estado.bedroomsOne.supplies.map(data => {
      if (payload.data >= 0 ) {
        if (data._id === payload.id) {
          data.quantity_stock = parseInt(payload.data)
        }
      }
    })
  } else if (payload.option === 4) {
    estado.dataAccept.map(data => {
      if (payload.data >= 0 && payload.data <= data.quantity) {
        if (data._id === payload.id) {
          data.quantity = parseInt(payload.data)
        }
      }
    })
  }

  return Map(estado);
}

const setDataSupplies = (state, payload) => {
  let estado = state.toJS();
  estado.dataAccept = payload.data
  return Map(estado);
}

const setOne = (state, payload) => {
  let estado = state.toJS();
  if (payload.data >= 0 && payload.data <= 100) {
    estado.bedroomsOne.supplies.map(data => {
      if (data._id === payload.id) {
        data.quantity = parseInt(payload.data)
      }
    })
  }
  return Map(estado);
}

const setSupplies = (state, payload) => {
  let estado = state.toJS();
  estado.bedroomsOne.supplies.push({
    name: payload.label,
    _id: payload._id,
    code: payload.code,
    quantity: 0
  })
  return Map(estado);
}

const queryBelongingFunction = (state, payload) => {
  let estado = state.toJS();
  console.log(payload);

  if (payload.option === 4) {
    estado.dataAccept.push({
      ...payload,
      cantidad: 0
    })
  } else if (payload.option === 1) {
    estado.dataAccept.push({
      ...payload,
      cantidad: 0
    })
  } else if (payload.option === 3) {
    estado.bedroomsOne.supplies.push({
      ...payload,
      cantidad: 0
    })
  }
  return Map(estado);
}

const bedroomsReducer = (state = Map(), action) => {

  switch (action.type) {
    case "LOAD_BEDROOMS": {
      return loadbedroons(state, action.payload)
    }
      break;

    case "LOAD_ONE_BEDROOMS":
      return loadOneBedroons(state, action.payload)
      break;

    case "SEARCH_SUPPLIES":
      return searchSupplies(state, action.payload)
      break;

    case "DATA_SUPPLIES":
      return acceptData(state, action.payload)
      break;

    case "SET_DATA_SUPPLIES":
      return setSuppliesData(state, action.payload)
      break;

    case "DELETE_DATA_SUPPLIES":
      return setDataSupplies(state, action.payload)
      break;

    case "SET_ONE_SUPPLIES":
      return setOne(state, action.payload)
      break;

    case "ONE_SUPPLIES_SET":
      return setSupplies(state, action.payload)
      break;

    case "QUERY_BELONGING":
      return queryBelongingFunction(state, action.payload)
      break;
    default:
      return state

  }
}

export default bedroomsReducer