import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";

const queryStoreBranchOffices = `${url}/api/queryStoreBranchOffices`;
const LoadServices = `${url}/api/LoadServices`;

export const LoadConfigCommissionsFunction = () => dispatch => {
  getDataToken()
    .then(datos => {
    	axios.get(queryStoreBranchOffices, datos)
    	.then(res => {	
    		LoadServicesFunction(datos, arrayServices => {   	 
		        dispatch({
		          type: "LOAD_CONFIG_COMMISSIONS",
		          payload: {
		            loading: "hide",
		            data: res.data,
		            dataInactive: res.data,                                                            
		            services: arrayServices,
		            action:0
				}
			});      	
        });
  	   })
      .catch(error => {
			console.log("Error consultando la api de la configuracion de comisiones",error.toString());
      });
      
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

const LoadServicesFunction = (datos, execute) => {
  axios
    .get(LoadServices, datos)
    .then(res => {
      //console.log(res.data);
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api para consultar los servicios",
        error.toString()
      );
    });
};

export const actionProps = () => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "ACTION_PROPS",
        payload: 1
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const setPorcentajeTable = (pos, value) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "SET_PORCENTAJE_COMISIONES",
        payload: {
          pos: pos,
          value: value,          
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const setSwitchTableComisiones = (pos, value) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "SET_SWITCH_COMISIONES",
        payload: {
          pos: pos,
          value: value          
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};