import { getDataToken, url } from "../core/connection";
import { data } from "../views/Ventas/mockData";
import { openSnackbars } from "./aplicantionActions";
import axios from "axios";

const searchPatientUrl = `${url}/api/queryOnePatients`;

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
      })
      .catch(err => {
        const result = converToJson(err);
        dispatch(searchLoaded(true));
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
