import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";
const queryListInternalStaff = `${url}/api/queryListInternalStaff`;
const queryPosition = `${url}/api/queryPosition`;
const createPosition = `${url}/api/createPosition`;
const editPosition = `${url}/api/editPosition`;

export const LoadPersonalCargosFunction = () => dispatch => {
  getDataToken()
    .then(datos => {
    	axios.get(queryListInternalStaff, datos)
    	.then(res => {
		    LoadCargosFunction(datos, cargos => {          
          dispatch({
            type: "LOAD_PERSONAL_CARGOS",
            payload: {
              loading: "hide",
              personal: res.data,
              cargos: cargos,              
            }
          });          
        });  				
    	})
        .catch(error => {
  			console.log("Error consultando la api de usuarios no master",error.toString());
        });
      
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

const LoadCargosFunction = (datos, execute) => {
  axios
    .get(queryPosition, datos)
    .then(res => {
      execute(res.data);
    })
    .catch(error => {
      console.log("Error consultando la api de cargos", error.toString());
    });
};

export const saveCargoAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: createPosition,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error guardando el cargo"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const editCargoAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: editPosition,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error editando el cargo"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};