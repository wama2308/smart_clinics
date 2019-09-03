import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";
import decode from "jwt-decode";

export const LoadConfigTurnosFuction = () => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "LOAD_CONFIG_TURNOS",
        payload: {}
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
}