import { search } from "../actions/aplicantionActions";

const InitalState = {
  snackBars: {
    type: "success",
    message: "",
    open: false
  },
  confirm: {
    open: false,
    message: "",
    callback: undefined
  },
  openModalExists: false,
  search: "",
  outside: true,
  dataGeneral: null,
  searchloading:true
};

const AplicationReducers = (state = InitalState, action) => {
  switch (action.type) {
    case "OPEN_SNACKBARS": {
      return { ...state, snackBars: action.payload };
    }
    case "CLOSE_SNACKBARS": {
      return {
        ...state,
        snackBars: { open: false, type: state.snackBars.type }
      };
    }
    case "OPEN_CONFIRM": {
      return {
        ...state,
        confirm: {
          open: true,
          ...action.payload.message,
          callback: action.payload.callback
        }
      };
    }
    case "CLOSE_CONFIRM": {
      return { ...state, confirm: { ...state.confirm, open: false } };
    }
    case "SEARCH_DATA": {
      return { ...state, search: action.payload };
    }

    case "OUT_CLICK": {
      return { ...state, outside: action.payload };
    }
    case "CONFIG_GENERAl": {
      return { ...state, dataGeneral: action.payload };
    }

    case "SEARCH_LOADED":
      return {...state , searchloading:action.payload}
    default:
      return state;
  }
};

export default AplicationReducers;
