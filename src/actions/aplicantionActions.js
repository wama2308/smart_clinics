import axios from "axios";
import { url, getDataToken } from "../core/connection";
const loadCountriesArray = `${url}/api/loadCountriesArray`;
const queryNationalPayments = `${url}/api/queryNationalPayments`;
const queryGeneral = `${url}/api/queryGeneral`;
const createMenuUrl = `${url}/api/createMenu`;

export const ConfigGeneralFunction = () => dispatch => {
  getDataToken()
    .then(datos => {
      axios
        .get(loadCountriesArray, datos)
        .then(res => {
          queryNationalPaymentsFunction(datos, dataCountries => {
            queryGeneralFunction(datos, dataGeneral => {
              getMenu(datos, MenuAndPermits => {
                dispatch({
                  type: "CONFIG_GENERAl",
                  payload: {
                    countries: res.data,
                    dataCountries: dataCountries,
                    dataGeneral: dataGeneral,
                    ...MenuAndPermits
                  }
                });
              });
            });
          });
        })
        .catch(error => {
          console.log(
            "Error consultando las apis de configuracion general",
            error.toString()
          );
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

const getMenu = (token, cb) => {
  axios.get(createMenuUrl, token).then(res => {
    cb({
      menu: res.data.menu,
      permission: res.data.permission
    });
  });
};

const queryNationalPaymentsFunction = (datos, execute) => {
  axios
    .get(queryNationalPayments, datos)
    .then(res => {
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api de national payments",
        error.toString()
      );
    });
};

const queryGeneralFunction = (datos, execute) => {
  axios
    .get(queryGeneral, datos)
    .then(res => {
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api de query general",
        error.toString()
      );
    });
};

export const openSnackbars = (type, message) => {
  return {
    type: "OPEN_SNACKBARS",
    payload: {
      type,
      message,
      open: true
    }
  };
};

export const closeSnackbars = () => {
  return {
    type: "CLOSE_SNACKBARS"
  };
};

export const closeDialog = () => {
  return {
    type: "CLOSE_CONFIRM"
  };
};

export const openConfirmDialog = (message, callback) => {
  return {
    type: "OPEN_CONFIRM",
    payload: {
      message,
      callback
    }
  };
};

export const outsideClick = () => {
  return {
    type: "OUT_CLICK",
    payload: true
  };
};

export const insideClick = () => {
  return {
    type: "OUT_CLICK",
    payload: false
  };
};

export const search = data => {
  return {
    type: "SEARCH_DATA",
    payload: data
  };
};
