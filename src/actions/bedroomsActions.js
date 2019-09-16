import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";
import decode from "jwt-decode";

const loadBedrooms = `${url}/api/queryBedrooms`;
const queryOneBedrooms = `${url}/api/queryOneBedrooms`;
const createBedrooms = `${url}/api/createBedrooms`
const disabledBedrooms = `${url}/api/disabledBedrooms`
const searchBeloging = `${url}/api/searchBeloging`
const editOneBedrooms = `${url}/api/editOneBedrooms`
const enabledBedrooms = `${url}/api/enabledBedrooms`
const editBedrooms = `${url}/api/editBedrooms`
const queryOneBelonging = `${url}/api/queryOneBelonging`

 /*--------------------------API-------------------------------*/
export const loadBedroomsFunction = () => dispatch => {
  getDataToken()
    .then(datos => {
      axios.get(loadBedrooms, datos)
        .then(res => {
          dispatch({
            type: "LOAD_BEDROOMS",
            payload: res.data
          })
        })
    })
}

export const queryOneBedroomsFunction = (data) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: queryOneBedrooms,
        data: {
          _id: data
        },
        headers: datos.headers
      })
        .then(res => {
          dispatch({
            type: "LOAD_ONE_BEDROOMS",
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

export const createBedroomsFunction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: createBedrooms,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error guardando el Reclamo"));
          console.log("error");
        });
    })
}

export const editOneBedroomsFunction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: editOneBedrooms,
        data: data,
        headers: datos.headers
      })
    }).then(() => {
      callback();
      dispatch(openSnackbars("success", "Operacion Exitosa"));
    }).catch(() => {
      dispatch(openSnackbars("error", "Error guardando el Reclamo"));
      console.log("error");
    })
}

export const enabledBedroomsFunction = (data) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: enabledBedrooms,
        data: {
          _id: data
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error borrando la habitacion"));
          console.log("error");
        });
    })
}

export const editBedroomsFunction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: editBedrooms,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback()
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error borrando la habitacion"));
          console.log("error");
        });
    })
}

export const queryOneBelongingFunction = (data, option) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: queryOneBelonging,
        data: data,
        headers: datos.headers
      }).then(res => {
        dispatch({
          type: "SEARCH_DATA",
          payload: ""
        })
        dispatch({
          type: "QUERY_BELONGING",
          payload: {
            ...res.data,
            option: option
          }
        })
      })
    })
}

export const disabledBedroomsFuntion = (data) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: disabledBedrooms,
        data: {
          _id: data
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error borrando la habitacion"));
          console.log("error");
        });
    })
}
/*-------------------------API-------------------------------------*/


export const searchBelogingFunction = (data) => dispatch => {
  dispatch({
    type: "SEARCH_DATA",
    payload: data
  });

  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: searchBeloging,
        data: {
          value: data
        },
        headers: datos.headers
      }).then(res => {
        dispatch({
          type: "SEARCH_SUPPLIES",
          payload: res.data
        })
      })
    })
}

export const actionAcceptFunction = (data) => dispatch => {
  dispatch({
    type: "SEARCH_DATA",
    payload: ""
  })

  dispatch({
    type: "DATA_SUPPLIES",
    payload: data
  })
}

export const setDatasuppies = (data, id, option) => dispatch => {
  dispatch({
    type: "SET_DATA_SUPPLIES",
    payload: {
      data: data,
      id: id,
      option: option
    }
  })
}

export const deleteDataSupplies = () => dispatch => {
  dispatch({
    type: "DELETE_DATA_SUPPLIES",
    payload: {
      data: [],
    }
  })
}

export const dataSuppliesSet = (data, id) => dispatch => {
  dispatch({
    type: "SET_ONE_SUPPLIES",
    payload: {
      data: data,
      id: id
    }
  })
}

export const oneSuppliesSet = (data) => dispatch => {
  dispatch({
    type: "SEARCH_DATA",
    payload: ""
  })

  dispatch({
    type: "ONE_SUPPLIES_SET",
    payload: data
  })
}