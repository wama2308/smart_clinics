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
const queryAllSuppliesToTransfer = `${url}/api/queryAllSuppliesToTransfer`;
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
const queryStoreBranchOfficesSelect = `${url}/api/queryStoreBranchOfficesSelect`;
const querySelectTransfer = `${url}/api/querySelectTransfer`;
const transferRequest = `${url}/api/transferRequest`;
const queryAllRequestsMade = `${url}/api/queryAllRequestsMade`;
const queryAllRequestsReceived = `${url}/api/queryAllRequestsReceived`;
const queryOneTransferRequests = `${url}/api/queryOneTransferRequests`;

const converToJson = data => {
    const stringify = JSON.stringify(data);
    const parse = JSON.parse(stringify);
    return parse.response.data;
};


export const LoadTransferFunction = () => dispatch => {
    getDataToken()
        .then(datos => {
            axios.get(queryAllTransfer, datos)
                .then(res => {
                    LoadSelectBranchOfficesFunction(datos, arrayBranchOffices => {
                        queryAllTransferReceivedFunction(datos, allTransferRecibidas => {
                            queryAllRequestsMadeFunction(datos, allRequestMade => {
                                queryAllRequestsReceivedFunction(datos, allRequestReceived => {
                                    queryStoreBranchOfficesSelectFunction(datos, arrayStoreShelfs => {
                                        querySelectTransferAction(datos, arraySelectTransfers => {
                                            dispatch({
                                                type: "LOAD_TRANSFERS_ALL",
                                                payload: {
                                                    loading: "hide",
                                                    //data: res.data,
                                                    selectTransfers: arraySelectTransfers,
                                                    allTransfer: res.data,
                                                    allTransferRecibidas: allTransferRecibidas,
                                                    allRequestMade: allRequestMade,
                                                    requestMadeId: {},
                                                    allRequestReceived: allRequestReceived,
                                                    transferId: {},
                                                    products: [],
                                                    productsToTransfer: [],
                                                    subTotal: 0,
                                                    impuesto: 0,
                                                    total: 0,
                                                    dataProductId: {},
                                                    searchProduct: 0,
                                                    dataProductPrice: [],
                                                    branchOfficces: arrayBranchOffices,
                                                    dataShopId: {},
                                                    storeShelfs: arrayStoreShelfs,
                                                    ProductLoteId: {},
                                                    action: 0,
                                                    newProvider: {}
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                })
                .catch(error => {
                    console.log("Error consultando la api de compras", error.toString());
                });

        })
        .catch(() => {
            console.log("Problemas con el token");
        });
};

// export const querySelectTransferAction = () => dispatch => {
//     getDataToken()
//         .then(datos => {
//             axios.get(querySelectTransfer, datos)
//                 .then(res => {
//                     dispatch({
//                         type: "LOAD_SELECT_TRANSFERS",
//                         payload: res.data
//                     });
//                 })
//                 .catch(error => {
//                     console.log("Error consultando la api para consultar los select del modulo de transferencias", error.toString());
//                 });

//         })
//         .catch(() => {
//             console.log("Problemas con el token");
//         });
// };

const querySelectTransferAction = (datos, execute) => {
    axios
        .get(querySelectTransfer, datos)
        .then(res => {
            execute(res.data);
        })
        .catch(error => {
            console.log(
                "Error consultando la api para consultar las sucursales y departamentos de la sucursal",
                error.toString()
            );
        });
};

const queryStoreBranchOfficesSelectFunction = (datos, execute) => {
    axios
        .get(queryStoreBranchOfficesSelect, datos)
        .then(res => {
            execute(res.data);
        })
        .catch(error => {
            console.log(
                "Error consultando la api para consultar los almacenes y estantes de la sucursal",
                error.toString()
            );
        });
};

const queryAllRequestsMadeFunction = (datos, execute) => {
    axios
        .get(queryAllRequestsMade, datos)
        .then(res => {
            execute(res.data);
        })
        .catch(error => {
            console.log(
                "Error consultando la api para consultar las solicitudes realizadas",
                error.toString()
            );
        });
};

const queryAllRequestsReceivedFunction = (datos, execute) => {
    axios
        .get(queryAllRequestsReceived, datos)
        .then(res => {
            execute(res.data);
        })
        .catch(error => {
            console.log(
                "Error consultando la api para consultar las solicitudes recibidas",
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

export const LoadRequestMadeIdFunction = (id) => dispatch => {
    getDataToken()
        .then(datos => {
            axios({
                method: "post",
                url: queryOneTransferRequests,
                data: {
                    _id: id,
                },
                headers: datos.headers
            })
                .then(res => {
                    dispatch({
                        type: "REQUEST_MADE_ID",
                        payload: {
                            data: res.data
                        }
                    });
                })
                .catch(error => {
                    console.log(
                        "Error consultando la api para consultar las solicitudes realizadas por id",
                        error.toString()
                    );
                });
        })
        .catch(() => {
            console.log("Problemas con el token");
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
            url: queryAllSuppliesToTransfer,
            data: {
                value: data
            },
            ...token
        }).then(res => {
            dispatch({
                type: "SEARCH_PRODUCT_TRANSFER",
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
                    type: "SEARCH_ONE_PRODUCTS_TRANSFER",
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

export const setQuantityTranferAction = (id, value) => dispatch => {
    getDataToken()
        .then(datos => {
            dispatch({
                type: "SET_QUANTITY_TRANFSER",
                payload: {
                    id: id,
                    value: value,
                }
            });
        })
        .catch(() => {
            console.log("Problemas con el token");
        });
};


export const deleteProductsTransferFunction = (key) => dispatch => {
    getDataToken()
        .then(datos => {
            dispatch({
                type: "DELETE_PRODUCT_TRANSFER",
                payload: {
                    key: key
                }
            });
        })
        .catch(() => {
            console.log("Problemas con el token");
        });
};

export const cleanQuantityProductsTransferAction = () => dispatch => {
    getDataToken()
        .then(datos => {
            dispatch({
                type: "CLEAN_TRANSFER_QUANTYTI_PRODUCT",
                payload: []
            });
        })
        .catch(() => {
            console.log("Problemas con el token");
        });
};

export const saveTransferRequestAction = (data, callback) => dispatch => {
    getDataToken()
        .then(datos => {
            axios({
                method: "post",
                url: transferRequest,
                data: data,
                headers: datos.headers
            })
                .then(() => {
                    callback();
                    dispatch(openSnackbars("success", "Operacion Exitosa"));
                })
                .catch(error => {
                    dispatch(openSnackbars("error", "Error guardando la solicitud de transferencia"));
                });
        })
        .catch(() => {
            console.log("Problemas con el token");
        });
};

export const actionProps = (value) => dispatch => {
    getDataToken()
        .then(datos => {
            dispatch({
                type: "ACTION_PROPS",
                payload: value
            });
        })
        .catch(() => {
            console.log("Problemas con el token");
        });
};