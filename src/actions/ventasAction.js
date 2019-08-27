import { getDataToken, url } from "../core/connection";
import { openSnackbars } from "./aplicantionActions";
import axios from "axios";

const createSaleUrl = `${url}/api/createSale`;
const searchPatientUrl = `${url}/api/queryPatients`;
const createPatientsUrl = `${url}/api/createPatients`;
const searchProductUrl = `${url}/api/querySupplies`;
const searchOnePatientUrl = `${url}/api/queryOnePatients`;
const searchOneSuppplieUrl = `${url}/api/queryOneSupplie`;
const saveSale = `${url}/api/saveSale`;
const queryAdminsUrl = `${url}/api/queryAdmins`;
const discountRequestUrl = `${url}/api/discountRequest`;
const querySalesUrl = `${url}/api/querySales`;
const queryBillurl = `${url}/api/queryBill`;
const cancelInvoice = `${url}/api/cancelInvoice`;
const editCashierDiscount = `${url}/api/editCashierDiscount`;
const referencePersonnelUrl = `${url}/api/referencePersonnel`;
const deleteReferencePersonnel = `${url}/api/deleteReferencePersonnel`;
const queryOneReferencePersonnel = `${url}/api/queryOneReferencePersonnel`;
const createManualPersonnelReference = `${url}/api/createManualPersonnelReference`;

export const searchPatient = search => dispatch => {
  if (search.length < 1) {
    dispatch(searchLoaded(true));
  } else {
    dispatch(searchLoaded(false));
  }
  dispatch({
    type: "SEARCH_DATA",
    payload: search
  });
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: searchPatientUrl,
      data: {
        value: search
      },
      ...token
    })
      .then(res => {
        dispatch({
          type: "PATIENT_OPTIONS",
          payload: Object.values(res.data)
        });
      })
      .catch(err => {
        const result = converToJson(err);
        dispatch(openSnackbars("error", result.message));
      });
  });
};

const searchLoaded = data => {
  return {
    type: "SEARCH_LOADED",
    payload: data
  };
};

const loadingAllSell = data => {
  return {
    type: "ALL_SELL_LOADING",
    payload: data
  };
};

const converToJson = data => {
  const stringify = JSON.stringify(data);
  const parse = JSON.parse(stringify);
  return parse.response.data;
};

const orderData = data => {
  try {
    const result = data.split(" ");
    const typeIdentify = result[0].substr(0, 1);
    const dni = result[0].substr(2);

    return { type_identity: typeIdentify, dni: dni };
  } catch (err) {
    return data;
  }
};

const orderReferences = (reference, dispatch) => {
  dispatch({
    type: "SET_REFERENCES",
    payload: reference
  });
  if (reference.length > 1) {
    dispatch({
      type: "OPEN_MODAL_REFERENCE",
      payload: true
    });
  } else {
    dispatch({
      type: "SEARCH_ARRAY_PRODUCTS",
      payload:
        reference[0].products.length > 0 ? reference[0].products : undefined
    });
    dispatch({
      type: "SELECTED_REFERENCE",
      payload: {
        ...reference[0],
        products: (reference[0].products = undefined)
      }
    });
  }
};

export const selectedReferences = (data, callback) => dispatch => {
  dispatch({
    type: "SEARCH_ARRAY_PRODUCTS",
    payload: data.products
  });

  dispatch({
    type: "SELECTED_REFERENCE",
    payload: {
      ...data,
      products: (data.products = undefined)
    }
  });

  callback();
};

export const deleteReferences = (data, callback) => dispatch => {
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: deleteReferencePersonnel,
      data: data,
      ...token
    }).then(() => {
      callback();
    });
  });
};

export const closeModalReferences = () => {
  return {
    type: "OPEN_MODAL_REFERENCE",
    payload: false
  };
};

export const searchOnePatient = search => dispatch => {
  if (search.length === 0) {
    dispatch(openSnackbars("warning", "Ingrese nombre o dni del paciente!"));
    return;
  }

  const result = orderData(search.label);
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: searchOnePatientUrl,
      data: result,
      ...token
    })
      .then(res => {
        dispatch({
          type: "SEARCH_PATIENT",
          payload: res.data.patient
        });
        if (res.data.referencer.length > 0) {
          orderReferences(res.data.referencer, dispatch);
          // dispatch({
          //   type: "SEARCH_ARRAY_PRODUCTS",
          //   payload: res.data.array_products
          // });
        }
        dispatch(searchLoaded(true));
        dispatch({
          type: "SEARCH_DATA",
          payload: ""
        });
      })
      .catch(err => {
        dispatch(searchLoaded(true));
        dispatch(openSnackbars("error", "Paciente no registrado!"));
        dispatch({
          type: "SEARCH_PATIENT",
          payload: null
        });
      });
  });
};

export const createPatients = (values, loaded) => dispatch => {
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: createPatientsUrl,
      data: values,
      ...token
    })
      .then(res => {
        dispatch({
          type: "SEARCH_PATIENT",
          payload: res.data
        });
        dispatch(openSnackbars("success", "Operacion Exitosa"));
        loaded();
      })
      .catch(err => {
        loaded();
        const result = converToJson(err);
        dispatch(openSnackbars("error", result.error));
      });
  });
};

export const clean = () => {
  return {
    type: "CLEAN",
    payload: null
  };
};

export const searchProduct = data => dispatch => {
  getDataToken().then(token => {
    dispatch({
      type: "SEARCH_DATA",
      payload: data
    });
    axios({
      method: "POST",
      url: searchProductUrl,
      data: {
        name: data
      },
      ...token
    }).then(res => {
      dispatch({
        type: "SEARCH_PRODUCT",
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
      url: searchOneSuppplieUrl,
      data: {
        supplie_id: data.value
      },
      ...token
    })
      .then(res => {
        dispatch({
          type: "SEARCH_ONE_PRODUCTS",
          payload: {
            ...res.data,
            quantity: 1,
            searched: true
          }
        });
      })
      .catch(err => {
        dispatch(openSnackbars("error", "producto no encontrado"));
      });
  });
};

export const deleteItem = item => {
  return {
    type: "DELETE_ITEM",
    payload: item
  };
};

export const changeQuantytoSell = obj => dispatch => {
  if (obj.quanty < obj.value) {
    dispatch(
      openSnackbars(
        "error",
        "No tiene el stock necesario para agregar esta cantidad"
      )
    );
  } else {
    dispatch({
      type: "CHANGE_QUANTY_TO_SELL",
      payload: obj
    });
  }
};

export const addDiscount = data => dispatch => {
  dispatch({
    type: "CHANGE_DISCOUNT",
    payload: data
  });
};

export const cancelToSell = () => dispatch => {
  dispatch(clean());
  dispatch({
    type: "CLEAN_TABLE"
  });
};

export const saveInvoice = obj => dispatch => {
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: saveSale,
      data: obj,
      ...token
    }).then(res => {
      dispatch(cancelToSell());
      dispatch(openSnackbars("success", "Operacion Exitosa!"));
    });
  });
};

export const discountRequestAction = (obj, callback) => dispatch => {
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: discountRequestUrl,
      data: obj,
      ...token
    }).then(res => {
      callback();
      dispatch({
        type: "SET_DATA_DISCOUNT",
        payload: {
          ...res.data,
          saveBill: true
        }
      });
      dispatch(openSnackbars("success", "Operacion exitosa!"));
    });
  });
};

export const queryAdmins = () => dispatch => {
  getDataToken().then(token => {
    axios.get(queryAdminsUrl, token).then(res => {
      dispatch({
        type: "APPROVERS_DISCOUNT",
        payload: res.data
      });
    });
  });
};

export const querySales = () => dispatch => {
  getDataToken().then(token => {
    axios.get(querySalesUrl, token).then(res => {
      dispatch({
        type: "SALES_LIST",
        payload: res.data
      });
    });
  });
};

export const queryBill = id => dispatch => {
  dispatch(loadingAllSell(false));
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: queryBillurl,
      data: {
        bill_id: id
      },
      ...token
    }).then(res => {
      dispatch(loadingAllSell(true));
      dispatch({
        type: "EDIT_ALL_BILL",
        payload: { ...res.data, saveBill: true }
      });
    });
  });
};

export const cancelledBill = id => dispatch => {
  dispatch(loadingAllSell(false));
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: cancelInvoice,
      data: {
        bill_id: id
      },
      ...token
    }).then(res => {
      dispatch(openSnackbars("success", "Operacion exitosa!"));
      dispatch(cancelToSell());
      dispatch(loadingAllSell(true));
    });
  });
};

export const cancelDiscount = obj => dispatch => {
  dispatch(loadingAllSell(false));
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: editCashierDiscount,
      data: obj,
      ...token
    }).then(res => {
      dispatch(loadingAllSell(true));
      dispatch({
        type: "DISCOUNT_CANCELLED",
        payload: "CANCELLED"
      });
    });
  });
};

export const editDiscount = (obj, callback) => dispatch => {
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: editCashierDiscount,
      data: obj,
      ...token
    }).then(res => {
      callback();
      dispatch(openSnackbars("success", "Operacion exitosa!"));
    });
  });
};

export const createSale = (obj, typeBill, callback) => dispatch => {
  console.log("actions", obj);
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: createSaleUrl,
      data: obj,
      ...token
    })
      .then(res => {
        callback();
        if (typeBill !== 1) {
          dispatch(cancelToSell());
        } else {
          dispatch({
            type: "SELL_COMPLETED",
            payload: res.data
          });
        }
        dispatch(openSnackbars("success", "Operacion exitosa!"));
      })
      .catch(err => {
        console.log(err);
      });
  });
};

export const cleanSearch = () => {
  return {
    type: "SEARCH_DATA",
    payload: ""
  };
};

const filterSearchReferences = values => {
  console.log("dios mio", values);
  const result = values.split(" ");

  console.log("actions", result);
};

export const getOptionsPersonal = (staff, value) => dispatch => {
  dispatch({
    type: "SEARCH_DATA",
    payload: value
  });
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: referencePersonnelUrl,
      data: {
        staff: staff,
        value: value
      },
      ...token
    }).then(res => {
      if (staff === 0) {
        dispatch({
          type: "OPTIONS_INTERNALS",
          payload: Object.values(res.data)
        });
      } else {
        dispatch({
          type: "OPTIONS_EXTERNAL",
          payload: Object.values(res.data)
        });
      }
    });
  });
};

export const getOneReference = (data, callback) => dispatch => {
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: queryOneReferencePersonnel,
      data: {
        _id: data
      },
      ...token
    }).then(res => {
      callback(res.data);
    });
  });
};

export const createReference = (obj, callback) => dispatch => {
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: createManualPersonnelReference,
      data: obj,
      ...token
    }).then(res => {
      dispatch({
        type: "SELECTED_REFERENCE",
        payload: {
          ...res.data.referencer[0]
        }
      });
      callback();
    });
  });
};
