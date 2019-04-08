import authState from "../state/authState";
import AuthService from "../core/auth/AuthService";
import { url } from "../core/connection";

const auth = new AuthService(
   url
);

export function setState() {
  return {
    type: "SETSTATE",
    payload: authState
  };
}


export const logout = (route) => dispatch => {
  auth.logout(
    route,
    ()=>dispatch({
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
