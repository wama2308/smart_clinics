import { getDataToken, url } from "../core/connection";
import { openSnackbars } from "./aplicantionActions";
import axios from "axios";

const searchPatientUrl = `${url}/api/queryOnePatients`;
const createPatientsUrl = `${url}/api/createPatients`;
const searchProductUrl = `${url}/api/querySupplies`;

export const searchPatient = (search, type) => dispatch => {
  dispatch(searchLoaded(false));
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: searchPatientUrl,
      data: {
        type_identity: type,
        dni: search
      },
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
        dispatch(openSnackbars("error", result.message));
        dispatch({
          type: "SEARCH_PATIENT",
          payload: null
        });
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
        type:"SEARCH_PRODUCT",
        payload: Object.values(res.data)
      });
    });
  });
};
