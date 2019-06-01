import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";
const listCountryProvider = `${url}/api/listCountryProvider`;
const detailsProvider = `${url}/api/detailsProvider`;
const createProvider = `${url}/api/createProvider`;
const editProvider = `${url}/api/editProvider`;
const disableProvider = `${url}/api/disableProvider`;

export const LoadDistributorFunction = () => dispatch => {
  getDataToken()
    .then(datos => {
    	axios.get(listCountryProvider, datos)
    	.then(res => {		    
        dispatch({
          type: "LOAD_DISTRIBUTOR",
          payload: {
            loading: "hide",
            data: res.data,                
            contacs: [],
            tableContac: 0
          }
        });          		
    	})
      .catch(error => {
			console.log("Error consultando la api de usuarios no master",error.toString());
      });
      
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const LoadDistributorIdFunction = distributorId => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: detailsProvider,
        data: {
          id: distributorId
        },
        headers: datos.headers
      })
        .then(res => {
          dispatch({
            type: "LOAD_DISTRIBUTOR_ID",
            payload: {
              distributorId: res.data,
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

export const addContactoFunction = (objContacto) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "ADD_CONTACTO",
        payload: {
          objContacto: objContacto
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const deleteContactoFunction = key => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "DELETE_CONTACTO",
        payload: key
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const cleanContacs = () => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "CLEAN_CONTACS",
        payload: {          
          contacs: []
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const saveDistributorAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: createProvider,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error guardando el proveedor"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const editDistributorAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: editProvider,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error editando el proveedor"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const DeleteDistributorAction = proveedorId => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: disableProvider,
        data: {
          id: proveedorId
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Proveedor eliminado con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error eliminando el proveedor"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};