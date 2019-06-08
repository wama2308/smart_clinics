import { getDataToken, url } from "../core/connection";
import { openSnackbars } from "./aplicantionActions";
import axios from "axios";

const searchPatientUrl = `${url}/api/queryPatients`;
const createPatientsUrl = `${url}/api/createPatients`;
const searchProductUrl = `${url}/api/querySupplies`;
const searchOnePatientUrl = `${url}/api/queryOnePatients`;
const searchOneSuppplieUrl = `${url}/api/queryOneSupplie`;
const saveSale = `${url}/api/saveSale`;

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
          payload: res.data
        });
        dispatch(searchLoaded(true));
        dispatch({
          type: "SEARCH_DATA",
          payload: ""
        });
      })
      .catch(err => {
        const result = converToJson(err);
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
            quanty: 1
          }
        });
      })
      .catch(err => {
        const result = converToJson(err);
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
  console.log("data", obj);
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
      console.log("data", res);
    });
  });
};
