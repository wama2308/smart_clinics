import { Map } from "immutable";

const loadGoodsFunction = (state, payload) => {
  let estado = state.toJS();
  estado.goodsEnabled = []
  estado.goodsDisabled = []
  estado.id = {}

  payload.enabled.map(data => {
    estado.goodsEnabled.push({
      ...data,
      page: 0,
      rowsPerPage: 5
    })
  })

  payload.disabled.map(data => {
    estado.goodsDisabled.push({
      ...data,
      page: 0,
      rowsPerPage: 5
    })
  })

  return Map(estado);
}

const loadOneGoodsFunction = (state, payload) => {
  let estado = state.toJS();
  estado.goodsOne = payload
  return Map(estado);
}

const nextPage = (state, payload) => {
  let estado = state.toJS();
  if (payload.option) {
    estado.goodsEnabled.find(data => {
      if (data._id === payload.id) {
        data.page = payload.page
      }
    })
  } else {
    estado.goodsDisabled.find(data => {
      if (data._id === payload.id) {
        data.page = payload.page
      }
    })
  }

  return Map(estado);
}

const rowPaginationFunction = (state, payload) => {
  let estado = state.toJS();

  if (payload.option) {
    estado.goodsEnabled.find(data => {
      if (data._id === payload.id) {
        data.page = payload.page
        data.rowsPerPage = payload.rowsPerPage
      }
    })
  } else {
    estado.goodsDisabled.find(data => {
      if (data._id === payload.id) {
        data.rowsPerPage = payload.page
        data.rowsPerPage = payload.rowsPerPage
      }
    })
  }

  return Map(estado);
}

const GoodsReducer = (state = Map(), action) => {

  switch (action.type) {
    case "LOAD_GOODS":
      return loadGoodsFunction(state, action.payload)

    case "QUERY_ONE_GODDS":
      return loadOneGoodsFunction(state, action.payload)

    case "NEXT_PAGE":
      return nextPage(state, action.payload)


    case "ROW_PAGINATION":
      return rowPaginationFunction(state, action.payload)

    default:
      return state

  }
}

export default GoodsReducer