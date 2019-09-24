import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";
import decode from "jwt-decode";

const queryAllBelonging = `${url}/api/queryAllBelonging`;
const queryOneBelonging = `${url}/api/queryOneBelonging`;
const disabledBelonging = `${url}/api/disabledBelonging`;
const createBelonging = `${url}/api/createBelonging`;
const editBelonging = `${url}/api/editBelonging`;
const enabledBelonging = `${url}/api/enabledBelonging`;

export const queryAllBelongingFunction = () => dispatch => {
  getDataToken()
    .then(datos => {
      axios.get(queryAllBelonging, datos)
        .then(res => {
          dispatch({
            type: "LOAD_GOODS",
            payload: res.data
          })
        })
    })
}

export const queryOneBelongingFunction = (id) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: queryOneBelonging,
        data: {
          _id: id
        },
        headers: datos.headers
      })
        .then(res => {
          dispatch({
            type: "QUERY_ONE_GODDS",
            payload: res.data
          })
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error eliminando el Reclamo"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
}

export const disabledBelongingFunction = (data) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: disabledBelonging,
        data: {
          _id: data
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error borrando el Espacio"));
        });
    })
}

export const createBelongingFunction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: createBelonging,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Operacion Exitosa"));
          callback()
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error al crear Mobiliario"));
        });
    })
}

export const editBelongingFunction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: editBelonging,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Operacion Exitosa"));
          callback()
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Erro al editar Mobiliario"));
        });
    })
}

export const enabledBelongingFunction = (data) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: enabledBelonging,
        data: {
          _id: data
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error habilitando el Espacio"));
        });
    })
}