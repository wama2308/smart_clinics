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
const searchOnePatientUrl = `${url}/api/queryOnePatients`;
const referencePersonnelUrl = `${url}/api/referencePersonnel`;
const queryOneReferencePersonnel = `${url}/api/queryOneReferencePersonnel`;
const queryOnlySupplies = `${url}/api/queryOnlySupplies`;

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
                  servicesAllCommission: arrayServices,
                  servicesAllPayment: arrayServices,
                  servicesCommission: arrayServices,
                  servicesPayment: arrayServices,
                  externalStaff: arrayExternalStaff,
                  cargos: arrayCargos,
                  dataStaffPatientAll:[],
                  //dataStaffPatientId:{},
                  dataInternalStaffAll:[],
                  //dataInternalStaffId:[],                  
                  dataExternalStaffAll:[],
                  //dataExternalStaffId:[],
                  dataPatientsStaff:[],
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

export const actionProps = (value) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "ACTION_PROPS",
        payload: value
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

export const setPorcentajeTable = (id, value) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "SET_PORCENTAJE_COMISIONES",
        payload: {
          id: id,
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

export const setSwitchTableComisiones = (id, value, tab, typePersonal) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "SET_SWITCH_COMISIONES",
        payload: {
          id: id,
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

export const searchPatientStaffAll = search => dispatch => {
  if (search.length < 1) {
    dispatch(searchLoaded(true));
  } else {
    dispatch(searchLoaded(false));
  }
  dispatch({
    type: "SEARCH_DATA",
    payload: search
  });
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
          type: "SEARCH_PATIENTS_STAFF_ALL",
          payload: Object.values(res.data)
        });
      })
      .catch(err => {
        const result = converToJson(err);
        dispatch(openSnackbars("error", result.message));
      });
  });
};

export const searchOnePatientStaff = search => dispatch => {
  if (search.length === 0) {
    dispatch(openSnackbars("warning", "Ingrese nombre o dni del paciente!"));
    return;
  }

  const result = orderData(search.label);
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: searchOnePatientUrl,
      data: result,
      ...token
    })
      .then(res => {
        dispatch({
          type: "SEARCH_ONE_PATIENT_STAFF",
          payload: res.data.patient
        });        
        dispatch(searchLoaded(true));
        dispatch({
          type: "SEARCH_DATA",
          payload: ""
        });
      })
      .catch(err => {
        dispatch(searchLoaded(true));
        dispatch(openSnackbars("error", "Paciente no registrado!"));
        dispatch({
          type: "SEARCH_PATIENT",
          payload: null
        });
      });
  });
};

export const getOptionsPersonal = (staff, value) => dispatch => {
  dispatch({
    type: "SEARCH_DATA",
    payload: value
  });
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: referencePersonnelUrl,
      data: {
        staff: staff,
        value: value
      },
      ...token
    }).then(res => {
      if (staff === 0) {
        dispatch({
          type: "OPTIONS_INTERNALS",
          payload: Object.values(res.data)
        });
      } else {
        dispatch({
          type: "OPTIONS_EXTERNAL",
          payload: Object.values(res.data)
        });
      }
    });
  });
};

export const getOneReference = (staff, data) => dispatch => {
  if (data.length === 0) {
    dispatch(
      openSnackbars("warning", "Debe ingresar nombre o dni del personal!")
    );
    return;
  }
  dispatch({
    type: "SEARCH_DATA",
    payload: ""
  });
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: queryOneReferencePersonnel,
      data: {
        _id: data.value
      },
      ...token
    })
      .then(res => {
        if (staff === 0) {
          dispatch({
            type: "SEARCH_STAFF_INTERNAL_ONE",
            payload: {
              ...res.data
            }
          });
        }else{
          dispatch({
            type: "SEARCH_STAFF_EXTERNAL_ONE",
            payload: {
              ...res.data
            }
          });
        }
      })
      .catch(err => {
        const result = converToJson(err);
        dispatch(openSnackbars("error", "personal no encontrado"));
      });
  });
};

export const removerRegisterFunction = (key) => dispatch => {  
  getDataToken()
    .then(datos => {
      dispatch({
        type: "REMOVE_REGISTER",
        payload: {
          key: key          
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const cleanDataPatientsStaffs = () => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "CLEAN_DATA_PATIENTS_STAFFS",
        payload: {
          data: []
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const filterServicesAction = (value, tab) => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "SET_FILTER_SERVICES",
        payload: {
          value: value, 
          tab: tab,          
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const messageErrorFunction = (message) => dispatch => {
  dispatch(openSnackbars("warning", `${message}`))
}

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

const orderData = data => {
  try {
    const result = data.split(" ");
    const typeIdentify = result[0].substr(0, 1);
    const dni = result[0].substr(2);

    return { type_identity: typeIdentify, dni: dni };
  } catch (err) {
    return data;
  }
};
