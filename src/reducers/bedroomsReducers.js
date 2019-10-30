import { Map } from 'immutable'
import { deleteDataSupplies, queryOneBelongingFunction, propsAction } from '../actions/bedroomsActions';

const loadbedroons = (state, payload) => {
  let estado = state.toJS();
  estado.bedroomsEnabled = []
  estado.bedroomsDisabled = []
  estado.dataAccept = []
  estado.propsAction = false
  estado.action = 1
  estado.masivo = false

  payload.enabled.map(data => {
    estado.bedroomsEnabled.push({
      ...data,
      page: 0,
      rowsPerPage: 5
    })
  })

  payload.disabled.map(data => {
    estado.bedroomsDisabled.push({
      ...data,
      page: 0,
      rowsPerPage: 5
    })
  })

  return Map(estado);
}

const loadOneBedroons = (state, payload) => {
  let estado = state.toJS();
  let array = []
  payload.loadOneTurnos.belogings.map(data => {
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
  estado.searchSupplies = payload.data
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
      if (payload.data >= 0 && payload.data <= data.quantity_stock) {
        if (data._id === payload.id) {
          data.cantidad = parseInt(payload.data)
        }
      }
    })
  } else if (payload.option === 3) {
    estado.bedroomsOne.name = payload.obj.nombre
    estado.bedroomsOne.abbreviation = payload.obj.abreviatura
    estado.bedroomsOne.floor = payload.obj.piso

    estado.bedroomsOne.supplies.map(data => {
      if (payload.data >= 0 && payload.data <= data.quantity_stock) {
        if (data._id === payload.id) {
          data.cantidad = parseInt(payload.data)
        }
      }
    })
  } else if (payload.option === 4) {
    estado.dataAccept.map(data => {
      if (payload.data >= 0 && payload.data <= data.quantity_stock) {
        if (data._id === payload.id) {
          data.cantidad = parseInt(payload.data)
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

const propsActionFucction = (state, payload) => {
  let estado = state.toJS();
  estado.propsAction = payload
  return Map(estado);
}

const setCollapse = (state, payload) => {
  let estado = state.toJS();

  estado.bedroomsEnabled.find(list => {
    if (list._id === payload.id && list.type_name === payload.type) {
      if (!list.status) {
        list.status = true
      } else {
        list.status = false
      }
    }
  })
  return Map(estado);
}

const setStop = (state, payload) => {
  let estado = state.toJS();

  if (estado.action === 1) {
    estado.action = payload
  } else {
    estado.action = payload
  }
  return Map(estado);
}

const loadModalTable = (state, payload) => {
  let estado = state.toJS();
  estado.loadModal = payload.loadOneTurnos
  return Map(estado);
}

const setTypeAction = (state, payload) => {
  let estado = state.toJS();
  estado.setId = payload.data
  return Map(estado);
}

const setSearchOptions = (state, payload) => {
  let estado = state.toJS();
  estado.searchSupplies = payload
  return Map(estado);
}

const setStateSupplies = (state, payload) => {
  let estado = state.toJS();
  estado.dataAccept = payload
  return Map(estado);
}

const deleteGoods = (state, payload) => {
  let estado = state.toJS();

  if (payload.option === 1) {
    estado.dataAccept = estado.dataAccept.filter(data => {
      return data.specific_id !== payload.specific_id
    })
  } else if (payload.option === 3) {
    estado.bedroomsOne.supplies = estado.bedroomsOne.supplies.filter(data => {
      return data.specific_id !== payload.specific_id
    })
  } else if (payload.option === 4) {
    estado.dataAccept = estado.dataAccept.filter(data => {
      return data._id !== payload.id
    })
  }
  return Map(estado);

}

const nextPage = (state, payload) => {
  let estado = state.toJS();

  if (payload.option) {
    if (payload.type_id) {
      estado.bedroomsEnabled.find(data => {
        if (data._id === payload.id && data.type_office === payload.type_id) {
          data.page = payload.page
        }
      })
    } else {
      estado.bedroomsEnabled.find(data => {
        if (data._id === payload.id) {
          data.page = payload.page
        }
      })
    }
  } else {
    if (payload.type_id) {
      estado.bedroomsDisabled.find(data => {
        if (data._id === payload.id && data.type_office === payload.type_id) {
          data.page = payload.page
        }
      })
    } else {
      estado.bedroomsDisabled.find(data => {
        if (data._id === payload.id) {
          data.page = payload.page
        }
      })
    }
  }

  return Map(estado);
}

const rowPaginationFunction = (state, payload) => {
  let estado = state.toJS();

  if (payload.option) {
    if (payload.type_id) {
      estado.bedroomsEnabled.find(data => {
        if (data._id === payload.id && data.type_office === payload.type_id) {
          data.page = payload.page
          data.rowsPerPage = payload.rowsPerPage
        }
      })
    } else {
      estado.bedroomsEnabled.find(data => {
        if (data._id === payload.id) {
          data.page = payload.page
          data.rowsPerPage = payload.rowsPerPage
        }
      })
    }
  } else {
    if (payload.type_id) {
      estado.bedroomsDisabled.find(data => {
        if (data._id === payload.id && data.type_office === payload.type_id) {
          data.page = payload.page
          data.rowsPerPage = payload.rowsPerPage
        }
      })
    } else {
      estado.bedroomsDisabled.find(data => {
        if (data._id === payload.id) {
          data.rowsPerPage = payload.page
          data.rowsPerPage = payload.rowsPerPage
        }
      })
    }

  }

  return Map(estado);
}

const bedroomsReducer = (state = Map(), action) => {

  switch (action.type) {
    case "LOAD_BEDROOMS":
      return loadbedroons(state, action.payload)

    case "LOAD_ONE_BEDROOMS":
      return loadOneBedroons(state, action.payload)

    case "SEARCH_SUPPLIES":
      return searchSupplies(state, action.payload)

    case "DATA_SUPPLIES":
      return acceptData(state, action.payload)

    case "SET_DATA_SUPPLIES":
      return setSuppliesData(state, action.payload)

    case "DELETE_DATA_SUPPLIES":
      return setDataSupplies(state, action.payload)

    case "SET_ONE_SUPPLIES":
      return setOne(state, action.payload)

    case "ONE_SUPPLIES_SET":
      return setSupplies(state, action.payload)

    case "QUERY_BELONGING":
      return queryBelongingFunction(state, action.payload)

    case "PROPS_ACTION":
      return propsActionFucction(state, action.payload)

    case "COLLAPSE_SET":
      return setCollapse(state, action.payload)

    case "STOP":
      return setStop(state, action.payload)

    case "LOAD_MODAL_TABLE":
      return loadModalTable(state, action.payload)

    case "SET_TYPE_ACTION":
      return setTypeAction(state, action.payload)

    case "SET_OPTION_SEARCH":
      return setSearchOptions(state, action.payload)

    case "SET_SUPPLIES":
      return setStateSupplies(state, action.payload)

    case "DELETE_GOOD":
      return deleteGoods(state, action.payload)

    case "NEXT_PAGE_BEDROOMS":
      return nextPage(state, action.payload)

    case "ROW_PAGINATION_BEDROOMS":
      return rowPaginationFunction(state, action.payload)

    default:
      return state
  }
}

export default bedroomsReducer