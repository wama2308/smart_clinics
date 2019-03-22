import authState from "../state/authState";
import AuthService from "../core/auth/AuthService";

// local Url http Request 'http://localhost:8000/api/'
const url =`http://192.168.1.127:8000`
const auth = new AuthService(
  "http://smartclinics.online/sc-admin/web/app.php/"
  // `http://192.168.1.127:8000/`
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
