import authState from "../state/authState";
import AuthService from "../core/auth/AuthService";
import { openSnackbars } from "./aplicantionActions";
import axios from "axios";
import { url } from "../core/connection";

const auth = new AuthService(url);

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
  auth.verify(data => {
    dispatch({
      type: "GET_DATA_USER",
      payload: data
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
    .put(url + "/api/CheckMaster", token)
    .then(res => {
      console.log("aca");
      dispatch({
        type: "NEW_STEP",
        payload: 1
      });
    })
    .catch(error => {
      const result = JSON.stringify(error);
      const errorR = JSON.parse(result);
      console.log(errorR);
      Object.keys(errorR.response.data).map(key => {
        dispatch(openSnackbars("error", errorR.response.data[key]));
      });
    });
};

export const confirmCode = (email, code) => {
  const token = {
    email: email,
    validation_code: code,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    }
  };
  console.log(token);
  axios
    .put(url + "/api/CheckCodeValidation", token)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
