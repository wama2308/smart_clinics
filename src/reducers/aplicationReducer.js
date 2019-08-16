import { search } from "../actions/aplicantionActions";
import { Map } from 'immutable'

const InitalState = {
  snackBars: {
    type: "success",
    message: "",
    open: false
  },
  confirm: {
    open: false,
    message: "",
    callback: undefined,
  },
  openModalExists: false,
  search: "",
  outside: true,
  dataGeneral: null,
  searchloading: true,
  chat:{
    message:""
  }
};

const setStoreSaveProviderPusher = (state, payload) => {
  let estado = state;
  estado.dataGeneral.dataCountries.provider.push({ label: payload.name, value: payload.id });
  return estado;
}

const setStoreEditProviderPusher = (state, payload) => {
  let estado = state;
  const key = estado.dataGeneral.dataCountries.provider.findIndex(provider => provider.value === payload.id);
  estado.dataGeneral.dataCountries.provider[key].label = payload.name;
  estado.dataGeneral.dataCountries.provider[key].value = payload.id;
  return estado;
}

const setStoreDisabledProviderPusher = (state, payload) => {
  let estado = state;
  const key = estado.dataGeneral.dataCountries.provider.findIndex(provider => provider.value === payload.id);
  estado.dataGeneral.dataCountries.provider.splice(key, 1);
  return estado;
}

const setStoreEnabledProviderPusher = (state, payload) => {
  let estado = state;
  estado.dataGeneral.dataCountries.provider.push({ label: payload.name, value: payload.id });
  return estado;
}

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
    case "CLEAN": {
      return { ...state, search: "" };
    }
    case "SEARCH_LOADED":
      return { ...state, searchloading: action.payload };

    case "SESION_OFF": {
      return InitalState;
    }

    case "CLEAN_DATA_GENERAL": {
      return InitalState;
    }

    case 'LOAD_PROVIDER_NEW_PUSHER': {
      return setStoreSaveProviderPusher(state, action.payload)
    }

    case 'LOAD_PROVIDER_EDIT_PUSHER': {
      return setStoreEditProviderPusher(state, action.payload)
    }

    case 'LOAD_PROVIDER_DISABLED_PUSHER': {
      return setStoreDisabledProviderPusher(state, action.payload)
    }

    case 'LOAD_PROVIDER_ENABLED_PUSHER': {
      return setStoreEnabledProviderPusher(state, action.payload)
    }

    default:
      return state;
  }
};

export default AplicationReducers;
