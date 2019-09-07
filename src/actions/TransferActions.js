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

const converToJson = data => {
    const stringify = JSON.stringify(data);
    const parse = JSON.parse(stringify);
    return parse.response.data;
};


export const LoadTransferFunction = () => dispatch => {
    getDataToken()
        .then(datos => {
            axios.get(queryAllShop, datos)
                .then(res => {
                    LoadSelectBranchOfficesFunction(datos, arrayBranchOffices => {
                        queryAllSuppliesFunction(datos, allProducts => {
                            queryAllTransferFunction(datos, allTransfer => {
                                queryAllTransferReceivedFunction(datos, allTransferRecibidas => {
                                    queryStoreBranchOfficesSelectFunction(datos, arrayStoreShelfs => {
                                        dispatch({
                                            type: "LOAD_TRANSFERS_ALL",
                                            payload: {
                                                loading: "hide",
                                                data: res.data,
                                                allTransfer: allTransfer,
                                                allTransferRecibidas: allTransferRecibidas,
                                                transferId: {},
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
                })
                .catch(error => {
                    console.log("Error consultando la api de compras", error.toString());
                });

        })
        .catch(() => {
            console.log("Problemas con el token");
        });
};

const queryAllSuppliesFunction = (datos, execute) => {
    axios
        .get(queryAllSuppliesToTransfer, datos)
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