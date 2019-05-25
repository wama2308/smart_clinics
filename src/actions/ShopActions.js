import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";
const LoadSelectBranchOffices = `${url}/api/LoadSelectBranchOffices`;
const createStoreBranchOffices = `${url}/api/createStoreBranchOffices`;
const editStoreBranchOffices = `${url}/api/editStoreBranchOffices`;
const queryAllShop = `${url}/api/queryAllShop`;
const queryOneStoreBranchOffices = `${url}/api/queryOneStoreBranchOffices`;
const disableStoreBranchOffices = `${url}/api/disableStoreBranchOffices`;
const querySupplies = `${url}/api/querySupplies`;
const queryOneSupplie = `${url}/api/queryOneSupplie`;
const priceSupplie = `${url}/api/priceSupplie`;
const createShop = `${url}/api/createShop`;
const queryOneShop = `${url}/api/queryOneShop`;

const verificationSupplies = `${url}/api/verificationSupplies`;

export const LoadShopFunction = () => dispatch => {
  getDataToken()
    .then(datos => {
    	axios.get(queryAllShop, datos)
    	.then(res => {		 
        LoadSelectBranchOfficesFunction(datos, arrayBranchOffices => {   
          dispatch({
            type: "LOAD_COMPRAS",
            payload: {
              loading: "hide",
              data: res.data,                                          
              //dataProducts: arrayProducts,
              products: [],
              subTotal: 0,
              impuesto: 0,
              total: 0,
              dataProductId: {},
              searchProduct: 0,
              dataProductPrice: [],
              branchOfficces: arrayBranchOffices,
              dataShopId: {}
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

/*const querySuppliesFunction = (datos, execute) => {
  axios
    .get(querySupplies, datos)
    .then(res => {
      //console.log(res.data);
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api para consultar los productos",
        error.toString()
      );
    });
};*/

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

export const searchProduct = data => dispatch => {
  getDataToken().then(token => {
    dispatch({
      type: "SEARCH_DATA",
      payload: data
    });
    axios({
      method: "POST",
      url: querySupplies,
      data: {
        name: data
      },
      ...token
    }).then(res => {
      dispatch({
        type: "SEARCH_PRODUCT_SHOP",
        payload: Object.values(res.data)
      });
    });
  });
};

export const searchOneSuppplie = data => dispatch => {
  if (data.length === 0) {
    dispatch(
      openSnackbars("warning", "Debe ingresar nombre o codigo del producto!")
    );
    return;
  }
  dispatch({
    type: "SEARCH_DATA",
    payload: ""
  });
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: queryOneSupplie,
      data: {
        supplie_id: data.value
      },
      ...token
    })
      .then(res => {
        dispatch({
          type: "SEARCH_ONE_PRODUCTS_SHOP",
          payload: {
            ...res.data            
          }
        });
      })
      .catch(err => {
        const result = converToJson(err);
        dispatch(openSnackbars("error", "producto no encontrado"));
      });
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

export const LoadShopIdFunction = (shopId) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: queryOneShop,
        data: {
          shop_id: shopId          
        },
        headers: datos.headers
      })
        .then(res => {
          dispatch({
            type: "LOAD_SHOP_ID",
            payload: {
              dataShopId: res.data,
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
        url: createShop,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {          
          dispatch(openSnackbars("error", "Error guardando la compra"));
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

export const verificationSuppliesAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: verificationSupplies,
        data: data,
        headers: datos.headers
      })
        .then((res) => {          
          if(res.data === 1){
            dispatch(openSnackbars("warning", "¡Este producto ya se encuentra registrado!"));
            callback();      
          }
              
        })
        .catch(error => {          
          dispatch(openSnackbars("error", "Error consultando el producto"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

const converToJson = data => {
  const stringify = JSON.stringify(data);
  const parse = JSON.parse(stringify);
  return parse.response.data;
};

export const cleanInfoProductId = () => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "CLEAN_INFO_PRODUCT_ID",
        payload: {}
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const LoadProductPriceFunction = (productId) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: priceSupplie,
        data: {
          id: productId
        },
        headers: datos.headers
      })
        .then(res => {
          dispatch({
            type: "LOAD_PRODUCT_PRICE",
            payload: {
              data: res.data,
              loading: 'hide'              
            }
          });
        })
        .catch(error => {
          console.log(
            "Error consultando la api para consultar los precios del producto por id",
            error.toString()
          );
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};