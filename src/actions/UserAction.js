import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
// const url = `http://smartclinics.online/sc-admin/web/app.php`;
// // const url = `http://localhost:8000`;

import { url } from "../core/connection";

const LoadRoles = `${url}/api/LoadRoles`;
const LoadAllUsersNoMaster = `${url}/api/LoadAllUsersNoMaster`;
const LoadPermitsMedicalCenter = `${url}/api/LoadPermitsMedicalCenter`;
const LoadModulesMedicalCenter = `${url}/api/LoadModulesMedicalCenter`;
const saveRol = `${url}/api/saveRol`;
const LoadRolId = `${url}/api/LoadRolId`;
const editRol = `${url}/api/editRol`;
const ValidateEmailUserNoMaster = `${url}/api/ValidateEmailUserNoMaster`;
const LoadSelectBranchOffices = `${url}/api/LoadSelectBranchOffices`;
const saveUserNoMaster = `${url}/api/saveUserNoMaster`;
const LoadIdUsersNoMaster = `${url}/api/LoadIdUsersNoMaster`;
const editUserNoMaster = `${url}/api/editUserNoMaster`;
const DeleteUserNoMaster = `${url}/api/DeleteUserNoMaster`;
const queryUserRegisterLatest = `${url}/api/queryUserRegisterLatest`;
const loadAllUsersNoMasterDisable = `${url}/api/loadAllUsersNoMasterDisable`;
const enabledUser = `${url}/api/enabledUser`;
const consultRolesDisabled = `${url}/api/consultRolesDisabled`;
const disabledRol = `${url}/api/disabledRol`;
const enabledRol = `${url}/api/enabledRol`;

const rolNew = {
  _id: {
    inc: 5684630,
    pID: 5129,
    timestamp: 1547656304
  },
  rol: "NEW WAMA",
  modules: [
    {
      name: "Configuracion",
      permits: ["create"]
    }
  ],
  status: true,
  created_at: {
    sec: 1547656303,
    usec: 989000
  },
  created_by: "5c34f40c7464200aee61bd28",
  updated_at: {
    sec: 1552486524,
    usec: 0
  },
  updated_by: "5c34f40c7464200aee61bd28"
};

function getPosts() {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem("id_token");
    const datos = {
      headers: { "access-token": token }
    };

    if (datos !== null) {
      resolve(datos);
    } else {
      reject("No ha llegado el token");
    }
  });
}
export const LoadAllUsersNoMasterFunction = () => dispatch => {
  getPosts()
    .then(datos => {
      axios
        .get(LoadAllUsersNoMaster, datos)
        .then(res => {
          LoadRolesFunction(datos, roles => {
            LoadSelectBranchOfficesFunction(datos, arrayBranchOffices => {
              const objectBranchOffices = Object.keys(arrayBranchOffices);
              const totalBranchOffices = objectBranchOffices.length;
              LoadPermitsMedicalCenterFunction(datos, permits => {
                LoadModulesMedicalCenterFunction(datos, modules => {
                  loadAllUsersNoMasterDisableFunction(datos, usersInactivos => {
                    consultRolesDisabledFunction(datos, rolesInactivos => {
                        dispatch({
                          type: "LOAD_USERS_ROLES",
                          payload: {
                            loading: "hide",
                            ...roles,
                            ...res.data,
                            usersInactivos:usersInactivos,
                            rolesInactivos:rolesInactivos,
                            totalBranchOffices,
                            arrayBranchOffices,
                            permits,
                            modules,
                            userIdView: {
                              loading: "hide",
                              email: "",
                              names: "",
                              surnames: "",
                              username: "",
                              sucursal: []
                            },
                            userId:'',
                            userEmail:'',
                        }
                      });
                    });    
                  });    
                });
              });
            });
          });
        })
        .catch(error => {
          console.log(
            "Error consultando la api de usuarios no master",
            error.toString()
          );
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

const LoadRolesFunction = (datos, execute) => {
  axios
    .get(LoadRoles, datos)
    .then(res => {
      execute(res.data);
    })
    .catch(error => {
      console.log("Error consultando la api de roles", error.toString());
    });
};

const loadAllUsersNoMasterDisableFunction = (datos, execute) => {
  axios
    .get(loadAllUsersNoMasterDisable, datos)
    .then(res => {
      execute(res.data);
    })
    .catch(error => {
      console.log("Error consultando la api de usuarios inactivos", error.toString());
    });
};

const consultRolesDisabledFunction = (datos, execute) => {
  axios
    .get(consultRolesDisabled, datos)
    .then(res => {
      execute(res.data);
    })
    .catch(error => {
      console.log("Error consultando la api de roles inactivos", error.toString());
    });
};

const LoadSelectBranchOfficesFunction = (datos, execute) => {
  axios
    .get(LoadSelectBranchOffices, datos)
    .then(res => {
      //console.log(res.data);
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api para consultar las sucursales",
        error.toString()
      );
    });
};

const LoadPermitsMedicalCenterFunction = (datos, execute) => {
  axios
    .get(LoadPermitsMedicalCenter, datos)
    .then(res => {
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api para consultar los permisos en el centro medico",
        error.toString()
      );
    });
};

const LoadModulesMedicalCenterFunction = (datos, execute) => {
  axios
    .get(LoadModulesMedicalCenter, datos)
    .then(res => {
      //console.log(res.data);
      execute(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api para consultar los modulos del centro medico",
        error.toString()
      );
    });
};

export const saveRolAction = (data, callback) => dispatch => {
  getPosts()
    .then(datos => {
      axios({
        method: "post",
        url: saveRol,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error guardando el rol"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const LoadRolIdFunction = rolId => dispatch => {
  getPosts()
    .then(datos => {
      axios({
        method: "post",
        url: LoadRolId,
        data: {
          rolId: rolId
        },
        headers: datos.headers
      })
        .then(res => {
          dispatch({
            type: "LOAD_ROL_ID",
            payload: {
              rolId: res.data,
              loading: "hide"
            }
          });
        })
        .catch(error => {
          console.log(
            "Error consultando la api para consultar los detalles del rol por id",
            error.toString()
          );
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const editRolAction = (data, callback) => dispatch => {
  getPosts()
    .then(datos => {
      axios({
        method: "post",
        url: editRol,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error guardando el rol"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const ValidateEmailUserNoMasterFunction = email => dispatch => {
  getPosts()
    .then(datos => {
      axios({
        method: "post",
        url: ValidateEmailUserNoMaster,
        data: {
          email: email
        },
        headers: datos.headers
      })
        .then(res => {
          if (res.data.estado === 0) {
            dispatch(
              openSnackbars("warning", "¡Este usuario se encuentra inactivo!")
            );
          } else {
            dispatch({
              type: "LOAD_EMAIL_INFO_USER",
              payload: {
                data: res.data,
                loading: "hide",
                openModal: true
              }
            });
          }
        })
        .catch(error => {
          console.log(
            "Error consultando la api para consultar la informacion del email del usuario",
            error.toString()
          );
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const deleteInfoUser = (clean, exist) => dispatch => {
  getPosts()
    .then(datos => {
      dispatch({
        type: "DELETE_DATA_INFO_USER",
        payload: {
          clean: clean,
          exist: exist
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const deleteInfoUserId = () => dispatch => {
  getPosts()
    .then(datos => {
      dispatch({
        type: "DELETE_DATA_INFO_USER_ID",
        payload: ""
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const saveUserNoMasterAction = (data, callback) => dispatch => {
  getPosts()
    .then(datos => {
      axios({
        method: "post",
        url: saveUserNoMaster,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error guardando el usuario"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const editUserNoMasterAction = (data, callback) => dispatch => {
  getPosts()
    .then(datos => {
      axios({
        method: "post",
        url: editUserNoMaster,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error editando el usuario"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const LoadIdUsersNoMasterFunction = userId => dispatch => {
  getPosts()
    .then(datos => {
      axios({
        method: "post",
        url: LoadIdUsersNoMaster,
        data: {
          id: userId
        },
        headers: datos.headers
      })
        .then(res => {
          dispatch({
            type: "LOAD_USER_ID",
            payload: {
              email: res.data.email,
              names: res.data.names,
              surnames: res.data.surnames,
              username: res.data.username,
              sucursal: res.data.sucursal,
              loading: "hide"
            }
          });
        })
        .catch(error => {
          console.log(
            "Error consultando la api para consultar los detalles del usuario por id",
            error.toString()
          );
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const DeleteUserNoMasterAction = userId => dispatch => {
  getPosts()
    .then(datos => {
      axios({
        method: "post",
        url: DeleteUserNoMaster,
        data: {
          userId: userId
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Usuario eliminado con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error eliminando el usuario"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const ActivateUserNoMasterAction = userId => dispatch => {
  getPosts()
    .then(datos => {
      axios({
        method: "post",
        url: enabledUser,
        data: {
          _id: userId
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Usuario activado con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error activando el usuario"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const disabledRolAction = rolId => dispatch => {
  getPosts()
    .then(datos => {
      axios({
        method: "post",
        url: disabledRol,
        data: {
          _id: rolId
        },
        headers: datos.headers
      })
        .then(() => {            
          dispatch(openSnackbars("success", "Rol eliminado con exito"));                
        })
        .catch(error => {
          dispatch(openSnackbars("warning", "Este rol no puede ser eliminado, se encuentra asignado a un usuario"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const enabledRolAction = rolId => dispatch => {
  getPosts()
    .then(datos => {
      axios({
        method: "post",
        url: enabledRol,
        data: {
          _id: rolId
        },
        headers: datos.headers
      })
        .then(() => {
          dispatch(openSnackbars("success", "Rol activado con exito"));
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error activando el rol"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const addSucursalFunction = (email, arraySucursal) => dispatch => {
  getPosts()
    .then(datos => {
      dispatch({
        type: "ADD_SUCURSAL",
        payload: {
          email: email,
          arraySucursal: arraySucursal
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const deleteSucursalFunction = key => dispatch => {
  getPosts()
    .then(datos => {
      dispatch({
        type: "DELETE_SUCURSAL",
        payload: key
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const deleteUserIdView = () => dispatch => {
  getPosts()
    .then(datos => {
      dispatch({
        type: "DELETE_USER_ID_VIEW",
        payload: {
          email: "",
          names: "",
          surnames: "",
          username: "",
          sucursal: []
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

export const addEmailStoreAction = email => dispatch => {
  getPosts()
    .then(datos => {
      dispatch({
        type: "ADD_EMAIL_STORE",
        payload: email
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

const UserRegisterLatestFunction = (email, execute) => {
  getPosts()
    .then(datos => {
      axios({
            method: "post",
            url: queryUserRegisterLatest,
            data: {
                email:email,
            },
            headers: datos.headers
      })
      .then(res => {
        execute(res.data);
      })
      .catch(error => {
        console.log("Error consultando la api de para consultar el ultimo usuario registrado por email", error.toString());
      });
    })
  .catch(() => {
    console.log("Problemas con el token");
  });
};

const DeleteUserRegisterFunction = (userId) => {
  getPosts()
    .then(datos => {
      axios({
            method: "post",
            url: DeleteUserNoMaster,
            data: {
              userId: userId
            },
            headers: datos.headers
      })
      .then(res => {
        console.log("Usuario eliminado con exito");
      })
      .catch(error => {
        console.log("Error eliminando el usuario", error.toString());
      });
    })
  .catch(() => {
    console.log("Problemas con el token");
  });
};

export const saveUserNoMasterPersonalAction = (data, email, userId, callback) => dispatch => {
  getPosts()
    .then(datos => {
      axios({
        method: "post",
        url: saveUserNoMaster,
        data: data,
        headers: datos.headers
      })
        .then(() => {
          UserRegisterLatestFunction(email, usuario => {                      
            dispatch({
              type: "LOAD_USUARIO_REGISTRADO_PERSONAL",
              payload: usuario
            });          
          });
          callback();
          dispatch(openSnackbars("success", "Operacion Exitosa"));
          if(userId !== ""){
            //DeleteUserRegisterFunction(userId);
          }
          
        })
        .catch(error => {
          dispatch(openSnackbars("error", "Error guardando el usuario"));
        });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};

 /***************************TEST WAMA***************************/
export const testFunction = () => dispatch => {
  getPosts()
    .then(datos => {
      dispatch({
        type: "LOAD_ROL_NEW",
        payload: {
          ...rolNew
        }
      });
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
}
