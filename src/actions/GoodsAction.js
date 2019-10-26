import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";
import decode from "jwt-decode";
import { converToJson } from "../core/utils";

const queryAllBelonging = `${url}/api/queryAllBelonging`;
const queryOneBelonging = `${url}/api/queryOneBelonging`;
const disabledBelonging = `${url}/api/disabledBelonging`;
const createBelonging = `${url}/api/createBelonging`;
const editBelonging = `${url}/api/editBelonging`;
const enabledBelonging = `${url}/api/enabledBelonging`;
const queryBelongingsBedrooms = `${url}/api/queryBelongingsBedrooms`

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

export const queryOneBelongingFunction = (id, specifict_id) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: queryOneBelonging,
        data: {
          _id: id,
          specific_id: specifict_id
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
          _id: data.id,
          specific_id: data.specifict_id
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          const result = converToJson(error);
          dispatch(openSnackbars("error", `${result.message}`));
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
          const result = converToJson(error);
          dispatch(openSnackbars("error", `${result}`));
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
          const result = converToJson(error);
          dispatch(openSnackbars("error", `${result.message}`));
        });
    })
}

export const enabledBelongingFunction = (data) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: enabledBelonging,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          const result = converToJson(error);
          dispatch(openSnackbars("error", `${result.message}`));
        });
    })
}

export const nextPage = (data) => dispatch => {
  dispatch({
    type: "NEXT_PAGE",
    payload: data
  })
}

export const backPage = (data) => dispatch => {
  dispatch({
    type: "BACK_PAGE",
    payload: data
  })
}

export const dataPagination = (data) => dispatch => {
  dispatch({
    type: "DATA_PAGINATION",
    payload: data
  })
}

export const rowPagination = (data) => dispatch => {
  dispatch({
    type: "ROW_PAGINATION",
    payload: data
  })
}

export const createTable = (data) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: queryBelongingsBedrooms,
        data: data,
        headers: datos.headers
      }).then(res => {
        dispatch({
          type: "LOAD_ALL_TABLE",
          payload: res.data
        })
      })
    })
}