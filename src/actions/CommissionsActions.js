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
const selectExternalStaff = `${url}/api/selectExternalStaff`;
const queryPosition = `${url}/api/queryPosition`;
const searchPatientUrl = `${url}/api/queryPatients`;

export const LoadConfigCommissionsFunction = () => dispatch => {
  getDataToken()
    .then(datos => {
    	axios.get(queryCommissionsGeneral, datos)
    	.then(res => {	
    		LoadServicesFunction(datos, arrayServices => {   	 
          LoadExternalStaffFunction(datos, arrayExternalStaff => {     
            LoadCargosFunction(datos, arrayCargos => {     
              dispatch({
                type: "LOAD_CONFIG_COMMISSIONS",
                payload: {
                  loading: "hide",
                  data: res.data,		            
                  dataId:{},                                                        
                  servicesCommission: arrayServices,
                  servicesPayment: arrayServices,
                  externalStaff: arrayExternalStaff,
                  cargos: arrayCargos,
                  dataPatientsAll:[],
                  action:0
                }
              });
            });  
          });  
        });
  	   })
      .catch(error => {
			console.log("Error consultando la api de las reglas para las comisiones",error.toString());
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
            "Error consultando la api para consultar los detalles de la regla para la comision por id",
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

const LoadExternalStaffFunction = (datos, execute) => {
  axios
    .get(selectExternalStaff, datos)
    .then(res => {
      //console.log(res.data);
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api para consultar el personal externo",
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

export const cleanListServicesTab = (tab) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "CLEAN_LIST_SERVICES_TAB",
        payload: {
          percentaje: 0,
          confirm: false,
          tab:tab
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

export const setPorcentajeAllTable = (value) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "SET_PORCENTAJE_ALL_COMISIONES",
        payload: {
          value: value,          
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const setSwitchTableComisiones = (pos, value, tab, typePersonal) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "SET_SWITCH_COMISIONES",
        payload: {
          pos: pos,
          value: value, 
          tab: tab,
          typePersonal:typePersonal          
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const setSwitchAllTableComisiones = (value, tab, typePersonal) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "SET_SWITCH_ALL_COMISIONES",
        payload: {
          value: value, 
          tab: tab,
          typePersonal:typePersonal          
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
          dispatch(openSnackbars("error", "Error guardando la regla para la comision"));
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
          dispatch(openSnackbars("error", "Error editando la regla para la comision"));
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
          dispatch(openSnackbars("success", "Regla para comision eliminada con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error eliminando la regla para la comision"));
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
          dispatch(openSnackbars("success", "Regla para comision activada con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error activando la regla para la comision"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const searchPatientAll = search => dispatch => {  
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: searchPatientUrl,
      data: {
        value: search
      },
      ...token
    })
      .then(res => {
        dispatch({
          type: "SEARCH_PATIENTS_ALL",
          payload: Object.values(res.data)
        });
      })
      .catch(err => {
        const result = converToJson(err);
        dispatch(openSnackbars("error", result.message));
      });
  });
};

const converToJson = data => {
  const stringify = JSON.stringify(data);
  const parse = JSON.parse(stringify);
  return parse.response.data;
};
