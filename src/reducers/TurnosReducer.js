import { Map } from 'immutable'

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
  estado.oneTurnos.fields.map((list) => {
    if (list._id === payload.id) {
      list.required = payload.status
    }
  })
  return Map(estado);
}

const setSizeTableTurnos = (state, payload) => {
  let estado = state.toJS();
  estado.oneTurnos.fields.map((list) => {
    if (list._id === payload.id) {
      list.size = payload.data
    }
  })
  return Map(estado);
}

const setPositionTableTurnos = (state, payload) => {
  let estado = state.toJS();
  estado.oneTurnos.fields.map((list) => {
    if (list._id === payload.id) {
      list.position = payload.data
    }
  })
  return Map(estado);
}

const setGroupTableTurnos = (state, payload) => {
  let estado = state.toJS();
  estado.oneTurnos.fields.map((list) => {
    if (list._id === payload.id) {
      list.group = payload.data
    }
  })
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
