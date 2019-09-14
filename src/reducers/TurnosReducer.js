import { Map } from 'immutable'
import { parse } from 'date-fns';

const loadOneTurnosFunction = (state, payload) => {
  let estado = state.toJS();
  estado.oneTurnos = payload.loadOneTurnos;
  return Map(estado);
}

const loadOriginalTurnosFunction = (state, payload) => {
  let estado = state.toJS();
  estado.oneTurnos = payload.LoadTurnosOriginal
  return Map(estado);
}

const setSwitchTableTurnos = (state, payload) => {
  let estado = state.toJS();

  estado.oneTurnos.height = parseInt(payload.height)
  estado.oneTurnos.width = parseInt(payload.width)
  estado.oneTurnos.logo_status = payload.logoStatus

  estado.oneTurnos.fields.map((list) => {
    if (list._id === payload.id) {
      list.required = payload.status
      if (payload.status === false) {
        list.required = payload.status
        list.group = 1
        list.position = 1
        list.size = 1
      }
    }
  })
  return Map(estado);
}

const setSizeTableTurnos = (state, payload) => {
  let estado = state.toJS();
  if (payload.data >= 1 && payload.data <= 100) {
    estado.oneTurnos.fields.map((list) => {
      if (list._id === payload.id) {
        list.size = parseInt(payload.data)
      }
    })
  }
  return Map(estado);
}

const setPositionTableTurnos = (state, payload) => {
  let estado = state.toJS();
  if (payload.data >= 1 && payload.data <= 100) {
    estado.oneTurnos.fields.map((list) => {
      if (list._id === payload.id) {
        list.position = parseInt(payload.data)
      }
    })
  }
  return Map(estado);
}

const setGroupTableTurnos = (state, payload) => {
  let estado = state.toJS();
  if (payload.data >= 1 && payload.data <= 100) {
    estado.oneTurnos.fields.map((list) => {
      if (list._id === payload.id) {
        list.group = parseInt(payload.data)
      }
    })
  }
  return Map(estado);
}

const TurnosReducer = (state = Map(), action) => {

  switch (action.type) {
    case "LOAD_CONFIG_TURNOS": {
      return Map(action.payload)
    }
      break;

    case "LOAD_ONE_TURNOS": {
      return loadOneTurnosFunction(state, action.payload)
    }
      break;

    case "LOAD_ORIGINAL_TURNOS": {
      return loadOriginalTurnosFunction(state, action.payload)
    }
      break;

    case "SET_SWITCH_TURNOS": {
      return setSwitchTableTurnos(state, action.payload)
    }
      break;

    case "SET_SIZE_TURNOS": {
      return setSizeTableTurnos(state, action.payload)
    }
      break;

    case "SET_POSITION_TURNOS": {
      return setPositionTableTurnos(state, action.payload)
    }
      break;

    case "SET_GROUP_TURNOS": {
      return setGroupTableTurnos(state, action.payload)
    }
      break;


    default:
      return state

  }
}

export default TurnosReducer
