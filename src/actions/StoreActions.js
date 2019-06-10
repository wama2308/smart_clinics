import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";
const LoadSelectBranchOffices = `${url}/api/LoadSelectBranchOffices`;
const createStoreBranchOffices = `${url}/api/createStoreBranchOffices`;
const editStoreBranchOffices = `${url}/api/editStoreBranchOffices`;
const queryStoreBranchOffices = `${url}/api/queryStoreBranchOffices`;
const queryOneStoreBranchOffices = `${url}/api/queryOneStoreBranchOffices`;
const disableStoreBranchOffices = `${url}/api/disableStoreBranchOffices`;
const enableStoreBranchOffices = `${url}/api/enableStoreBranchOffices`;
const queryStoreBranchOfficesDisabled = `${url}/api/queryStoreBranchOfficesDisabled`;

export const LoadStoreFunction = () => dispatch => {
  getDataToken()
    .then(datos => {
    	axios.get(queryStoreBranchOffices, datos)
    	.then(res => {		 
        LoadSelectBranchOfficesFunction(datos, arrayBranchOffices => {   
          queryStoreBranchOfficesDisabledFunction(datos, storeInactivos => {   
            dispatch({
              type: "LOAD_STORE",
              payload: {
                loading: "hide",
                data: res.data,                            
                storeInactivos: storeInactivos,                            
                branchOfficces: arrayBranchOffices,
                shelfs:[],
                action:0
              }
            });          		
          });
        });
  	   })
      .catch(error => {
			console.log("Error consultando la api de almacen",error.toString());
      });
      
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

const LoadSelectBranchOfficesFunction = (datos, execute) => {
  axios
    .get(LoadSelectBranchOffices, datos)
    .then(res => {
      //console.log(res.data);
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api para consultar las sucursales",
        error.toString()
      );
    });
};

const queryStoreBranchOfficesDisabledFunction = (datos, execute) => {
  axios
    .get(queryStoreBranchOfficesDisabled, datos)
    .then(res => {
      //console.log(res.data);
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api para consultar los almacenes inactivos",
        error.toString()
      );
    });
};

export const addShelfsFunction = (objShelfs) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "ADD_SHELFS",
        payload: {
          objShelfs: objShelfs
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const deleteShelfsFunction = key => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "DELETE_SHELFS",
        payload: key
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const cleanShelfs = () => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "CLEAN_SHELFS",
        payload: {          
          shelfs: []
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const LoadStoreIdFunction = (storeId, sucursalId) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: queryOneStoreBranchOffices,
        data: {
          store_id: storeId,
          sucursal_id: sucursalId
        },
        headers: datos.headers
      })
        .then(res => {
          dispatch({
            type: "LOAD_STORE_ID",
            payload: {
              storeId: res.data,
              loading: "hide"
            }
          });
        })
        .catch(error => {
          console.log(
            "Error consultando la api para consultar los detalles del proveedor por id",
            error.toString()
          );
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const saveStoreAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: createStoreBranchOffices,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {          
          dispatch(openSnackbars("error", "Error guardando el almacen"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const editStoreAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: editStoreBranchOffices,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error editando el almacen"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const DeleteStoreAction = (storeId, sucursalId) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: disableStoreBranchOffices,
        data: {
          sucursal_id: sucursalId,
          store_id: storeId
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Almacen eliminado con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error eliminando el almacen"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const enableStoreBranchOfficesAction = (storeId, sucursalId) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: enableStoreBranchOffices,
        data: {
          sucursal_id: sucursalId,
          store_id: storeId
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Almacen activado con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error activado el almacen"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};