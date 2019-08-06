import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";
const LoadSelectReclamos = `${url}/api/sucribeMedicalCenter`;
const SaveReclamos = `${url}/api/createClaims`;
const queryAll = `${url}/api/queryClaimsMadeAll`;
const queryOne = `${url}/api/queryOneClaimMade`;
const updateReclamos = `${url}/api/updateClaims`;
const deleteReclamos = `${url}/api/cancelClaims`

const LoadReclamosFuntion = () => dispatch => {
  getDataToken().then(data => {

  })
}

export const cleanReclamos = () => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "CLEAN_RECLAMOS",
        payload: {
          dataReclamosId:{}
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const LoadSelectReclamosFuction = () => dispatch => {
  getDataToken()
    .then(datos => {
      axios
        .get(LoadSelectReclamos, datos)
        .then(res => {
          queryAllFunction(datos, arrayAll => {
            dispatch({
              type: "LOAD_SELECT",
              payload: {
                brachOffices: res.data,
                reclamosAll: arrayAll,
                loading: "show"
              }
            })
          })
        })
    })
}
export const updateReclamosFuction = (data, callback) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: updateReclamos,
      data: data,
      headers: datos.headers
    })
      .then(() => {
        callback();
        dispatch(openSnackbars("success", "Operacion Exitosa"));
      })
      .catch(error => {
        dispatch(openSnackbars("error", "Error editando el Reclamo"));
      });
  }).catch(() => {
    console.log("Problemas con el token");
  });
}

export const deleteReclamosFuction = (id_claim_receiver, id_claim_transmitter) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: deleteReclamos,
        data: {
          id_claim_receiver: id_claim_receiver,
          id_claim_transmitter: id_claim_transmitter
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Reclamo eliminado con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error eliminando el Reclamo"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const queryOneReclamos = (id_receiber, id_transmitter) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method:"post",
      url: queryOne,
      data: {
        id_claim_receiver: id_receiber,
        id_claim_transmitter: id_transmitter
      },
      headers: datos.headers
    }).then(res => {
      dispatch({
        type: "LOAD_RECLAMOS_ID",
        payload: {
          dataReclamosId: res.data,
          loading: "hide",
        }
      })
    })
  })
}

const queryAllFunction = (datos, execute) => {
  axios
    .get(queryAll, datos)
    .then(res => {
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api para consultar los productos",
        error.toString()
      );
    });
};

export const saveReclamosAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: SaveReclamos,
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
    .catch(() => {
    });
};

export const openModal = (data) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "OPEN",
        payload: {
          box: true
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};
