import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";
import decode from "jwt-decode";

const queryTicket = `${url}/api/queryTicket`
const queryOneTicket = `${url}/api/queryOneTicket`
const queryOneTicketOriginal = `${url}/api/queryOriginalTicket`
const editTicket = `${url}/api/editTicket`

export const LoadConfigTurnosFuction = () => dispatch => {
  const token = localStorage.getItem("id_token");
  const result = decode(token);

  getDataToken()
    .then(datos => {
      axios.get(queryTicket, datos).then(res => {
        dispatch({
          type: "LOAD_CONFIG_TURNOS",
          payload: {
            LoadTurnos: res.data,
            loading: "show",
            branchoffices_id: result.profile[0].medical_center[0].branch_office[0]._id,
          }
        })
      })
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
}

export const loadOriginalTurnos = () => dispatch => {
  getDataToken()
    .then(datos => {

      axios.get(queryOneTicketOriginal, datos).then(res => {
        dispatch({
          type: "LOAD_ORIGINAL_TURNOS",
          payload: {
            LoadTurnosOriginal: res.data
          }
        })
      })
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
}

export const queryOneTicketFunction = (data) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: queryOneTicket,
        data: {
          branchoffices_id: data
        },
        headers: datos.headers
      })
        .then(res => {
          dispatch({
            type: "LOAD_ONE_TURNOS",
            payload: {
              loadOneTurnos: res.data,
              loading: "hide",
            }
          })
        })

    })
    .catch(() => {
      console.log("Problemas con el token");
    });
}

export const editTurnosFunction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: editTicket,
        data: data,
        headers: datos.headers
      }).then(() => {
        callback();
        dispatch(openSnackbars("success", "Operacion Exitosa"));
      })
        .catch(error => {
          dispatch(openSnackbars("error", "Error editando el Reclamo"));
        });
    })
};


export const setSwitchTableTurnos = (obj) => dispatch => {
  dispatch({
    type: "SET_SWITCH_TURNOS",
    payload: obj
  });
};

export const setSizeTableTurnos = (id, data) => dispatch => {
  dispatch({
    type: "SET_SIZE_TURNOS",
    payload: {
      id: id,
      data: data
    }
  });
};

export const setPositionTableTurnos = (id, data) => dispatch => {
  dispatch({
    type: "SET_POSITION_TURNOS",
    payload: {
      id: id,
      data: data
    }
  });
};

export const setGroupTableTurnos = (id, data) => dispatch => {
  dispatch({
    type: "SET_GROUP_TURNOS",
    payload: {
      id: id,
      data: data
    }
  });
};
