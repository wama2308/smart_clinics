import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";
import decode from "jwt-decode";

const LoadSelectReclamos = `${url}/api/sucribeMedicalCenter`;
const SaveReclamos = `${url}/api/createClaims`;
const queryAllReceibe = `${url}/api/queryClaimsReceivedAll`;
const queryOne = `${url}/api/queryOneClaimMade`;
const updateReclamos = `${url}/api/updateClaims`;
const deleteReclamos = `${url}/api/cancelClaims`;
const atenderReclmos = `${url}/api/queryClaimsTransferAll`
const reclamosAll = `${url}/api/queryClaimsMadeAll`
const transferReclamos = `${url}/api/transferClaims`
const acceptReclamos = `${url}/api/acceptClaims`
const rejectReclamos = `${url}/api/rejectClaims`
const visitorSaveReclamos = `${url}/api/createClaimsVisitor`
const updateVisitor = `${url}/api/updateClaimsVisitor`


export const cleanReclamos = () => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "CLEAN_RECLAMOS",
        payload: {
          dataReclamosId: {}
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const LoadSelectReclamosFuction = () => dispatch => {
  const token = localStorage.getItem("id_token");
  const result = decode(token);

  getDataToken()
    .then(datos => {
      axios
        .get(LoadSelectReclamos, datos)
        .then(res => {
          queryAllReceibeFunction(datos, arrayReceibe => {
            atenderReclamosFuntion(datos, arrayAll => {
              reclamosAllFuntion(datos, arrayList => {
                dispatch({
                  type: "LOAD_SELECT",
                  payload: {
                    brachOffices: res.data,
                    reclamosAll: arrayAll,
                    reclamosReceibe: arrayReceibe,
                    listAll: arrayList,
                    loading: "show",
                    permission: result.permission,
                    transmiter: result.profile[0].medical_center[0].branch_office[0],
                    visitor_id: result
                  }
                })
              })
            })
          })
        })
    })
}

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
      method: "post",
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

export const transferClaimsFunction = (id_receiber, id_transmitter) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: transferReclamos,
      data: {
        id_claim_receiver: id_receiber,
        id_claim_transmitter: id_transmitter
      },
      headers: datos.headers
    }).then(() => {
      dispatch(openSnackbars("success", "Reclamo Transferido con exito"));
    }).catch(error => {
      dispatch(openSnackbars("error", "Error Transfiriendo el Reclamo"));
    })
  })
}

export const acceptReclamosFunction = (id_receiber, id_transmitter, time) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: acceptReclamos,
      data: {
        id_claim_receiver: id_receiber,
        id_claim_transmitter: id_transmitter,
        timeZ: time
      },
      headers: datos.headers
    }).then(() => {
      dispatch(openSnackbars("success", "Reclamo Aceptado con exito"));
    }).catch(error => {
      dispatch(openSnackbars("error", "Error al Aceptar el Reclamo"));
    })
  })
}

export const rejectReclamosFunction = (id_receiber, id_transmitter, time) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: rejectReclamos,
      data: {
        id_claim_receiver: id_receiber,
        id_claim_transmitter: id_transmitter,
        timeZ: time
      },
      headers: datos.headers
    }).then(() => {
      dispatch(openSnackbars("success", "Reclamo Aceptado con exito"));
    }).catch(error => {
      dispatch(openSnackbars("error", "Error al Aceptar el Reclamo"));
    })
  })
}

export const ReclamosFunction = (id_receiber, id_transmitter, time) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: acceptReclamos,
      data: {
        id_claim_receiver: id_receiber,
        id_claim_transmitter: id_transmitter,
        timeZ: time
      },
      headers: datos.headers
    }).then(() => {
      dispatch(openSnackbars("success", "Reclamo Aceptado con exito"));
    }).catch(error => {
      dispatch(openSnackbars("error", "Error al Aceptar el Reclamo"));
    })
  })
}

export const registerVisitorClaimFunction = (data, callback) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: visitorSaveReclamos,
      data: data,
      headers: datos.headers
    }).then(() => {
      callback()
      dispatch(openSnackbars("success", "Reclamo Aceptado con exito"));
    }).catch(error => {
      dispatch(openSnackbars("error", "Error al Aceptar el Reclamo"));
    })
  })
}

export const messageErrorFunction = () => dispatch => {
  dispatch(openSnackbars("warning", "Su Reclamo esta siendo procesado"))
}

export const updateReclamosVisitorFuction = (data, callback) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: updateVisitor,
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

const atenderReclamosFuntion = (datos, execute) => {
  axios
    .get(atenderReclmos, datos)
    .then(res => {
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api para consultar los reclamos atendidos",
        error.toString()
      );
    });
}

const reclamosAllFuntion = (datos, execute) => {
  axios
    .get(reclamosAll, datos)
    .then(res => {
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api para consultar listar reclamos",
        error.toString()
      );
    });
}

const queryAllReceibeFunction = (datos, execute) => {
  axios
    .get(queryAllReceibe, datos)
    .then(res => {
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api para consultar los reclamos recibidos",
        error.toString()
      );
    });
};
