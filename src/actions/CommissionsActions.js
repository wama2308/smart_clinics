import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";

const queryCommissionsGeneral = `${url}/api/queryCommissionsGeneral`;
const LoadServices = `${url}/api/LoadServices`;
const createCommissionsGeneral = `${url}/api/createCommissionsGeneral`;
const editCommissionsGeneral = `${url}/api/editCommissionsGeneral`;
const queryOneCommissionsGeneral = `${url}/api/queryOneCommissionsGeneral`;
const disabledCommissionsGeneral = `${url}/api/disabledCommissionsGeneral`;
const enabledCommissionsGeneral = `${url}/api/enabledCommissionsGeneral`;

export const LoadConfigCommissionsFunction = () => dispatch => {
  getDataToken()
    .then(datos => {
    	axios.get(queryCommissionsGeneral, datos)
    	.then(res => {	
    		LoadServicesFunction(datos, arrayServices => {   	 
		        dispatch({
		          type: "LOAD_CONFIG_COMMISSIONS",
		          payload: {
		            loading: "hide",
		            data: res.data,		            
                dataId:{},                                                        
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

export const LoadConfigCommissionIdFunction = (id) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: queryOneCommissionsGeneral,
        data: {
          _id: id,          
        },
        headers: datos.headers
      })
        .then(res => {
          dispatch({
            type: "LOAD_CONFIG_COMMISSION_ID",
            payload: {
              data: res.data              
            }
          });
        })
        .catch(error => {
          console.log(
            "Error consultando la api para consultar los detalles de la configuracion de comision por id",
            error.toString()
          );
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

export const cleanListServices = () => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "CLEAN_LIST_SERVICES",
        payload: {
          percentaje: 0,
          confirm: false
        }
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

export const saveConfigCommissionsAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: createCommissionsGeneral,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {          
          dispatch(openSnackbars("error", "Error guardando la configuracion de comision"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const editConfigCommissionsAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: editCommissionsGeneral,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {          
          dispatch(openSnackbars("error", "Error editando la configuracion de comision"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const DeleteConfigCommissionsAction = (id) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: disabledCommissionsGeneral,
        data: {
          _id: id          
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Configuracion de comision eliminad con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error eliminando la configuracion de la comision"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const enableConfigCommissionsAction = (id) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: enabledCommissionsGeneral,
        data: {
          _id: id
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Configuracion de comision activada con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error activando la configuracion de comision"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};