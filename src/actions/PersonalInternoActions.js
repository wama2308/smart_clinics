import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";
const queryListInternalStaff = `${url}/api/queryListInternalStaff`;
const queryPosition = `${url}/api/queryPosition`;
const createPosition = `${url}/api/createPosition`;
const editPosition = `${url}/api/editPosition`;
const createInternalStaff = `${url}/api/createInternalStaff`;
const editInternalStaff = `${url}/api/editInternalStaff`;
const queryOneInternalStaff = `${url}/api/queryOneInternalStaff`;
const deleteInternalStaff = `${url}/api/deleteInternalStaff`;
const queryEmailInternalStaff = `${url}/api/queryEmailInternalStaff`;
const enabledInternalStaff = `${url}/api/enabledInternalStaff`;
const queryListDisabledInternalStaff = `${url}/api/queryListDisabledInternalStaff`;
const queryPositionDisabled = `${url}/api/queryPositionDisabled`;
const disabledPosition = `${url}/api/disabledPosition`;
const enabledPosition = `${url}/api/enabledPosition`;

export const LoadPersonalCargosFunction = () => dispatch => {
  getDataToken()
    .then(datos => {
    	axios.get(queryListInternalStaff, datos)
    	.then(res => {
		    LoadCargosFunction(datos, cargos => {          
          queryListDisabledInternalStaffFunction(datos, personalInactivo => {                    
            queryPositionDisabledFunction(datos, cargosInactivos => {                    
              dispatch({
                type: "LOAD_PERSONAL_CARGOS",
                payload: {
                  loading: "hide",
                  personal: res.data,
                  personalInactivo: personalInactivo,
                  cargos: cargos,     
                  cargosInactivos: cargosInactivos,     
                  emailUsers: [],    
                  userId:'',       
                  personalId: {},
                  action: 0
                }
              });          
            });    
          });  
        });  				
    	})
      .catch(error => {
  		  console.log("Error consultando la api de personal y cargos",error.toString());
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

const queryPositionDisabledFunction = (datos, execute) => {
  axios
    .get(queryPositionDisabled, datos)
    .then(res => {
      execute(res.data);
    })
    .catch(error => {
      console.log("Error consultando la api de cargos inactivos", error.toString());
    });
};

const queryListDisabledInternalStaffFunction = (datos, execute) => {
  axios
    .get(queryListDisabledInternalStaff, datos)
    .then(res => {
      execute(res.data);
    })
    .catch(error => {
      console.log("Error consultando la api de personal inactivo", error.toString());
    });
};

export const LoadPersonalIdFunction = id => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: queryOneInternalStaff,
        data: {
          _id: id
        },
        headers: datos.headers
      })
        .then(res => {
          dispatch({
            type: "LOAD_PERSONAL_ID",
            payload: {
              personalId: res.data,
              loading: "hide"
            }
          });
        })
        .catch(error => {
          console.log(
            "Error consultando la api para consultar los detalles del personal por id",
            error.toString()
          );
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
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

export const savePersonalInternoAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: createInternalStaff,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error guardando el personal interno"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const editPersonalAction = (data, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: editInternalStaff,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error editando el personal interno"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const DeletePersonalInternoAction = id => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: deleteInternalStaff,
        data: {
          id: id
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Personal eliminado con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error eliminando el personal"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const enabledInternalStaffAction = id => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: enabledInternalStaff,
        data: {
          id: id
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Personal activado con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error activando el personal"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const disabledPositionAction = id => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: disabledPosition,
        data: {
          _id: id
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Cargo eliminado con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error eliminando el cargo"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const enabledPositionAction = id => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: enabledPosition,
        data: {
          _id: id
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Cargo activado con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error activando el cargo"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const ValidateEmailUsersFunction = (arrayEmails, callback) => dispatch => {
  getDataToken()
    .then(datos => {
      axios({
        method: "post",
        url: queryEmailInternalStaff,
        data: {
          array_email: arrayEmails
        },
        headers: datos.headers
      })
        .then(res => {       
          if(res.data === 0){
            dispatch(openSnackbars("warning", "¡Los correos ingresados ya se encuentran asignados!"));
          }else{            
            dispatch({
              type: "VALIDATE_EMAILS_USERS",
              payload: res.data                          
            });
            callback();          
          }          
        })
        .catch(error => {
          console.log(
            "Error consultando la api para validar los emails de usuarios a agregar",
            error.toString()
          );
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const deleteInfoAction = () => dispatch => {
  getDataToken()
    .then(datos => {
      dispatch({
        type: "DELETE_INFO_ACTION",
        payload: ""
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};