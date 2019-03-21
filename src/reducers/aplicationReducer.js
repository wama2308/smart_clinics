
const InitalState = {
    snackBars:{
        type:'success',
        message:'',
        open:false
    },
    confirm:{
      open:false,
      message:'',
      callback: undefined
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
  case 'OPEN_CONFIRM':{
    return {...state , confirm:{open:true , ...action.payload.message , callback:  action.payload.callback }}
  }

  case 'CLOSE_CONFIRM':{
    return {...state , confirm:{...state.confirm , open:false  }}
  }
  default:
    return state;
  }
};

export default AplicationReducers;
