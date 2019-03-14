import {Map , List} from 'immutable'

const InitalState = {
    snackBars:{
        type:'success',
        message:'',
        open:false
    }
}

const AplicationReducers = (state = InitalState , action) => {
  switch (action.type) {
  case 'OPEN_SNACKBARS': {
    return { ...state, snackBars:action.payload }
  }
  case 'CLOSE_SNACKBARS': {
    return { ...state, snackBars: {open:false , type: state.snackBars.type } }
  }
  default:
    return state;
  }
};

export default AplicationReducers;