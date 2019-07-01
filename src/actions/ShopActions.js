import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";
const LoadSelectBranchOffices = `${url}/api/LoadSelectBranchOffices`;
const queryAllShop = `${url}/api/queryAllShop`;
const disableStoreBranchOffices = `${url}/api/disableStoreBranchOffices`;
const querySupplies = `${url}/api/querySupplies`;
const queryOneSupplie = `${url}/api/queryOneSupplie`;
const priceSupplie = `${url}/api/priceSupplie`;
const createShop = `${url}/api/createShop`;
const queryOneShop = `${url}/api/queryOneShop`;
const editShop = `${url}/api/editShop`;
const removeProduct = `${url}/api/removeProduct`;
const disableShop = `${url}/api/disableShop`;
const verificationSupplies = `${url}/api/verificationSupplies`;
const queryAllSupplies = `${url}/api/queryAllSupplies`;
const queryOneSupplieWithLot = `${url}/api/queryOneSupplieWithLot`;
const editSupplie = `${url}/api/editSupplie`;
const editSupplieLot = `${url}/api/editSupplieLot`;
const productTransfer = `${url}/api/productTransfer`;
const queryAllTransfer = `${url}/api/queryAllTransfer`;
const queryOneTransfer = `${url}/api/queryOneTransfer`;
const editTransfer = `${url}/api/editTransfer`;
const disableTransfer = `${url}/api/disableTransfer`;
const queryAllTransferReceived = `${url}/api/queryAllTransferReceived`;
const rejectTransfer = `${url}/api/rejectTransfer`;
const acceptTransfer = `${url}/api/acceptTransfer`;
const defectiveSupplie = `${url}/api/defectiveSupplie`;

export const LoadShopFunction = () => dispatch => {
  getDataToken()
    .then(datos => {
    	axios.get(queryAllShop, datos)
    	.then(res => {
        LoadSelectBranchOfficesFunction(datos, arrayBranchOffices => {
          queryAllSuppliesFunction(datos, allProducts => {
            queryAllTransferFunction(datos, allTransfer => {
              queryAllTransferReceivedFunction(datos, allTransferRecibidas => {
                dispatch({
                  type: "LOAD_COMPRAS",
                  payload: {
                    loading: "hide",
                    data: res.data,
                    allTransfer:allTransfer,
                    allTransferRecibidas:allTransferRecibidas,
                    transferId:{},
                    //dataProducts: arrayProducts,
                    products: [],
                    subTotal: 0,
                    impuesto: 0,
                    total: 0,
                    dataProductId: {},
                    searchProduct: 0,
                    dataProductPrice: [],
                    branchOfficces: arrayBranchOffices,
                    dataShopId: {},
                    allProducts: allProducts,
                    ProductLoteId: {},
                    action: 0
                  }
                });
              });
            });
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

const queryAllSuppliesFunction = (datos, execute) => {
  axios
    .get(queryAllSupplies, datos)
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

const queryAllTransferFunction = (datos, execute) => {
  axios
    .get(queryAllTransfer, datos)
    .then(res => {
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api para consultar las transferencias",
        error.toString()
      );
    });
};

const queryAllTransferReceivedFunction = (datos, execute) => {
  axios
    .get(queryAllTransferReceived, datos)
    .then(res => {
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api para consultar las transferencias recibidas",
        error.toString()
      );
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
              loading: "hide",
              confirm: true,
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

export const queryOneTransferFunction = (transferId) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: queryOneTransfer,
        data: {
          id: transferId
        },
        headers: datos.headers
      })
        .then(res => {
          dispatch({
            type: "LOAD_TRANSFER_ID",
            payload: {
              dataTransferId: res.data,
              loading: "hide",
              confirm: true,
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

export const queryOneSupplieWithLotFunction = (supplie_id) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: queryOneSupplieWithLot,
        data: {
          supplie_id: supplie_id
        },
        headers: datos.headers
      })
        .then(res => {
          dispatch({
            type: "LOAD_PRODUCT_LOTE_ID",
            payload: res.data,
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

export const productTransferAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: productTransfer,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error guardando la transferencia"));
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
        url: editShop,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error editando la compra"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const editTransferAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: editTransfer,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error editando la transferencia"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const editSupplieAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: editSupplie,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error editando el producto"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const editSupplieLotAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: editSupplieLot,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          dispatch({
            type: "LOAD_LOTE_PRODUCTO",
            payload: data,
          });
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error editando el lote del producto"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const defectiveSupplieAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: defectiveSupplie,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          dispatch({
            type: "LOAD_LOTE_PRODUCTO_DEFECTUOSO",
            payload: data,
          });
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error editando el producto defectuoso"));
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

export const disableTransferAction = (id) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: disableTransfer,
        data: {
          id: id
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Transferencia eliminada con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error eliminando la transferencia"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const disableShopAction = (shopId) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: disableShop,
        data: {
          shop_id: shopId
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Compra eliminada con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error eliminando la compra"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const rejectTransferAction = (id) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: rejectTransfer,
        data: {
          id: id
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Transferencia rechazada con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error rechazando la transferencia"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const acceptTransferAction = (id) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: acceptTransfer,
        data: {
          id: id
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Transferencia aceptada con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error aceptando la transferencia"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const removeProductAction = (shopId, productId, loteId) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: removeProduct,
        data: {
          shop_id: shopId,
          id: productId,
          lote_id: loteId,
        },
        headers: datos.headers
      })
        .then((res) => {
          if(res.data === 1){
            dispatch(openSnackbars("warning", "¡Este producto ya se encuentra en el inventario, no puede ser eliminado!"));
          }else{
            dispatch(openSnackbars("success", "¡Producto eliminado con exito!"));
          }

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

export const setCantidadTableTransferencias = (pos, value, option) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "SET_CANTIDAD_TRANSFERENCIAS",
        payload: {
          pos: pos,
          value: value,
          option: option
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const setSwitchTableTransferencias = (pos, value, option) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "SET_SWITCH_TRANSFERENCIAS",
        payload: {
          pos: pos,
          value: value,
          option: option
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const setSelectAllSwitchTransferencias = (value, option) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "SET_SELECT_ALL_SWITCH_TRANSFERENCIAS",
        payload: {
          value: value,
          option: option
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};
