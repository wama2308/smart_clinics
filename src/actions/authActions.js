import authState from "../state/authState";
import AuthService from "../core/auth/AuthService";
import { openSnackbars } from "./aplicantionActions";
import axios from "axios";
import { url, getDataToken } from "../core/connection";
import decode from "jwt-decode";
const auth = new AuthService(url);

const type = {
  "Ya le fue enviado un codigo de validacion": 1
};

export function setState() {
  return {
    type: "SETSTATE",
    payload: authState
  };
}

export const logout = route => dispatch => {
  auth.logout(route, () =>
    dispatch({
      type: "SESION_OFF"
    })
  );
};

export const loginAction = (data, notify) => dispatch => {
  auth.login(data.username, data.password, notify, data => {
    dispatch({
      type: "GET_DATA_USER",
      payload: data
    });
  });
};

export const verify = () => dispatch => {
  getDataToken().then(token => {
    auth.verify(url, token, data => {
      dispatch({
        type: "GET_DATA_USER",
        payload: data
      });
    });
  });
};

export const register = (email, timeZ) => dispatch => {
  const token = {
    email: email,
    timeZ: timeZ,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-type": "application/json"
    }
  };
  axios
    .put(url + "/api/checkUser", token)
    .then(res => {
      dispatch({
        type: "NEW_STEP",
        payload: 2
      });
    })
    .catch(error => {
      const result = JSON.stringify(error);
      const errorR = JSON.parse(result);
      Object.keys(errorR.response.data).map(key => {
        if (type[errorR.response.data[key]]) {
          dispatch({
            type: "NEW_STEP",
            payload: 2
          });
          dispatch(openSnackbars("warning", errorR.response.data[key]));
        } else {
          dispatch(openSnackbars("error", errorR.response.data[key]));
        }
      });
    });
};

export const confirmCode = (email, code) => dispatch => {
  const token = {
    email: email,
    validation_code: code,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    }
  };
  axios
    .put(url + "/api/checkCodeValidation", token)
    .then(res => {
      dispatch({
        type: "NEW_STEP",
        payload: 3
      });
      dispatch({
        type: "SET_TYPE_USER",
        payload: res.data.type
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const registerStep = () => {
  return {
    type: "NEW_STEP",
    payload: 1
  };
};

export const backStep = step => {
  return {
    type: "NEW_STEP",
    payload: step - 1
  };
};

export const newStep = step => {
  return {
    type: "NEW_STEP",
    payload: step + 1
  };
};

export const loadSelect = () => dispatch => {
  axios.get(url + "/api/LoadSelects").then(res => {
    dispatch({
      type: "LOAD_SECRECT_QUESTIONS",
      payload: res.data
    });
  });
};

export const saveUser = obj => dispatch => {
  const token = {
    ...obj,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    }
  };
  axios.post(url + "/api/registerUser", token).then(res => {
    dispatch({
      type: "NEW_STEP",
      payload: undefined
    });
    dispatch(openSnackbars("success", "Registro exitoso!"));
  });
};

export const getTokenInfo = () => dispatch => {
  const token = localStorage.getItem("id_token");
  const result = decode(token);

  console.log("aca", result);
  dispatch({
    type: "USERS_PERMISS",
    payload: {
      menu: result.menu,
      permission: result.permission
    }
  });
};
