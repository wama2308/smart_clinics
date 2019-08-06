import { Map } from 'immutable'


const setStoreCleanReclamos = (state, payload) => {
	let estado = state.toJS();
	return Map(estado);
}

const setDataReclamosId = (state, payload) => {
  let estado = state.toJS();
  estado.reclamosId = payload.dataReclamosId;
	return Map(estado);
}


const ReclamosReducer = (state = Map(), action) => {
  switch (action.type) {
      case 'CLEAN_RECLAMOS': {
		  	return setStoreCleanReclamos(state, action.payload)
		  } 
      break;

      case 'LOAD_SELECT':{
        return  Map(action.payload)
      }

      case 'LOAD_RECLAMOS_ID':{
        return setDataReclamosId(state, action.payload)
      }

      break;
    default:
      return state
      break;
  }
}

export default ReclamosReducer