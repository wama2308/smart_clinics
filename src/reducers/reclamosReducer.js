import { Map } from 'immutable'


const setStoreCleanReclamos = (state, payload) => {
	let estado = state.toJS();
console.log("reducer",estado);
	return Map(estado);
}


const ReclamosReducer = (state = Map(), action) => {
  console.log(action.payload);
  switch (action.type) {
      case 'CLEAN_RECLAMOS': {
		  	return setStoreCleanReclamos(state, action.payload)
		  } 
      break;

      case 'LOAD_SELECT':{
        return  Map(action.payload)
      }
      break;
    default:
      return state
      break;
  }
}

export default ReclamosReducer