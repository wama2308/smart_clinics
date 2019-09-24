import { Map } from "immutable";


const loadGoodsFunction = (state, payload) => {
  let estado = state.toJS();
  estado.goodsEnabled = payload.enabled
  estado.goodsDisabled = payload.disabled 
  
  return Map(estado);
}

const loadOneGoodsFunction = (state, payload) =>{
  let estado = state.toJS();
  estado.goodsOne = payload 
  return Map(estado);
}


const GoodsReducer = (state = Map(), action) => {

  switch (action.type) {
    case "LOAD_GOODS": {
      return loadGoodsFunction(state, action.payload)
    }
      break;

    case "QUERY_ONE_GODDS":
      return loadOneGoodsFunction(state, action.payload)
      break;

    case "":
      return
      break;

    case "":
      return 

    default:
      return state

  }
}

export default GoodsReducer