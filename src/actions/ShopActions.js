import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";
const LoadSelectBranchOffices = `${url}/api/LoadSelectBranchOffices`;
const createStoreBranchOffices = `${url}/api/createStoreBranchOffices`;
const editStoreBranchOffices = `${url}/api/editStoreBranchOffices`;
const queryStoreBranchOffices = `${url}/api/queryStoreBranchOffices`;
const queryOneStoreBranchOffices = `${url}/api/queryOneStoreBranchOffices`;
const disableStoreBranchOffices = `${url}/api/disableStoreBranchOffices`;

export const LoadShopFunction = () => dispatch => {
  getDataToken()
    .then(datos => {
    	axios.get(queryStoreBranchOffices, datos)
    	.then(res => {		 
        LoadSelectBranchOfficesFunction(datos, arrayBranchOffices => {   
          dispatch({
            type: "LOAD_COMPRAS",
            payload: {
              loading: "hide",
              data: res.data,                                          
              products: [],
              subTotal: 0,
              impuesto: 0,
              total: 0
            }
          });          		
        });
  	   })
      .catch(error => {
			console.log("Error consultando la api de compras",error.toString());
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

export const addProductsFunction = (obj, subtotal, impuesto, total) => dispatch => {
  getDataToken()
    .then(datos => {      
      dispatch({
        type: "ADD_PRODUCTS",
        payload: {
          objProducts: obj,
          subTotal: subtotal,
          impuesto: impuesto,
          total: total
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const deleteProductsFunction = (key, subtotal, impuesto, total) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "DELETE_PRODUCTS",
        payload: {
          key: key,
          subTotal: subtotal,
          impuesto: impuesto,
          total: total  
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const cleanProducts = () => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "CLEAN_PRODUCTS",
        payload: {          
          products: []
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const LoadShopIdFunction = (storeId, sucursalId) => dispatch => {
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
            type: "LOAD_SHOP_ID",
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

export const saveShopAction = (data, callback) => dispatch => {
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

export const editShopAction = (data, callback) => dispatch => {
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

export const DeleteShopAction = (storeId, sucursalId) => dispatch => {
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