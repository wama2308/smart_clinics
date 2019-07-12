import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { getDataToken, url } from "../core/connection";
const loadService = `${url}/api/LoadServicesPreloaded`;
const loadPlantillasUrl = `${url}/api/LoadTemplates`;
const loadPlantillasTinymceUrl = `${url}/api/LoadTemplatesTinymce`;
const loadOriginalserviceUrl = `${url}/api/LoadServicesPreloadedOriginalId`;
const loadCatergoriaUrl = `${url}/api/LoadSelectCategory`;
const LoadServicesPreloadedId = `${url}/api/LoadServicesPreloadedId`;
const editServiceUrl = `${url}/api/editService`;
const saveTemplateUrl = `${url}/api/saveTemplate`;
const deletePlantillasUrl = `${url}/api/deleteTemplateId`;
const editPlatillaurl = `${url}/api/editTemplate`;
const deleteField = `${url}/api/disabledField`;
const createField = `${url}/api/createField`;
const editFieldUrl = `${url}/api/editField`;
const enabledFieldUrl = `${url}/api/enabledField`;

export const getDataServices = () => dispatch => {
  getDataToken().then(data => {
    axios
      .get(loadService, data)
      .then(res => {
        loadPlantillas(data, dispatch, result => {
          dispatch({
            type: "GET_DATA_SERVICE",
            payload: {
              loading: true,
              plantillas: result,
              servicios: res.data
            }
          });
        });
      })
      .catch(error => {
        dispatch(openSnackbars("error", error.toString()));
      });
  });
};

const loadPlantillas = (data, action, cb) => {
  axios
    .get(loadPlantillasUrl, data)
    .then(res => {
      loadPlantillasTinymce(data, action, result => {
        cb({
          ...res.data,
          tinymce: result
        });
      });
    })
    .catch(error => {
      action(openSnackbars("error", error.toString()));
    });
};

const loadPlantillasTinymce = (data, action, cb) => {
  axios
    .get(loadPlantillasTinymceUrl, data)
    .then(res => {
      cb(res.data);
    })
    .catch(error => {
      action(openSnackbars("error", error.toString()));
    });
};

export const loadOriginalService = obj => dispatch => {
  getDataToken().then(data => {
    axios({
      method: "post",
      url: loadOriginalserviceUrl,
      data: {
        licenseId: obj.licenseId,
        serviceId: obj.serviceId
      },
      ...data
    }).then(res => {
      loadCategoria(data, dispatch, result => {
        dispatch({
          type: "GET_DATA_MODAL_SERVICE",
          payload: {
            loading: "hide",
            serviceOriginal: res.data,
            categoria: result
          }
        });
      });
    });
  });
};

export const loadModifiedService = obj => dispatch => {
  getDataToken().then(data => {
    axios({
      method: "post",
      url: LoadServicesPreloadedId,
      data: {
        licenseId: obj.licenseId,
        serviceId: obj.serviceId
      },
      ...data
    }).then(res => {
      loadCategoria(data, dispatch, result => {
        dispatch({
          type: "GET_DATA_MODAL_SERVICE",
          payload: {
            loading: "hide",
            serviceOriginal: res.data,
            categoria: result
          }
        });
      });
    });
  });
};

const loadCategoria = (data, dispatch, cb) => {
  axios
    .get(loadCatergoriaUrl, data)
    .then(res => {
      cb(res.data);
    })
    .catch(error => {
      dispatch(openSnackbars("error", error.toString()));
    });
};

export const editServices = (datos, loaded) => dispatch => {
  console.log(datos);
  getDataToken().then(data => {
    axios({
      method: "post",
      url: editServiceUrl,
      data: {
        ...datos
      },
      ...data
    }).then(res => {
      loaded();
      dispatch(openSnackbars("success", "Operacion Exitosa"));
    });
  });
};

export const SavePlantillas = (obj, callback) => dispatch => {
  getDataToken().then(data => {
    axios({
      method: "post",
      url: saveTemplateUrl,
      data: obj,
      ...data
    }).then(res => {
      callback();
      dispatch(openSnackbars("success", "Operacion Exitosa"));
    });
  });
};

export const deletePlantillas = obj => dispatch => {
  getDataToken().then(data => {
    axios({
      method: "post",
      url: deletePlantillasUrl,
      data: {
        posicion: obj.id,
        timeZ: obj.time
      },
      ...data
    }).then(() => {
      dispatch(openSnackbars("success", "Operacion Exitosa"));
    });
  });
};

export const editPlantilla = (obj, callback) => dispatch => {
  getDataToken().then(data => {
    axios({
      method: "post",
      url: editPlatillaurl,
      data: obj,
      ...data
    }).then(() => {
      callback();
      dispatch(openSnackbars("success", "Operacion Exitosa"));
    });
  });
};

export const editModifyServices = value => dispatch => {
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: deleteField,
      data: value,
      ...token
    }).then(async res => {
      dispatch({
        type: "DELETE_FIELD",
        payload: res.data
      });
    });
  });
};

export const addField = (value, callback) => dispatch => {
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: createField,
      data: value,
      ...token
    }).then(res => {
      callback();
      console.log("asdasd", res);
    });
  });
};

export const editField = (value, callback) => dispatch => {
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: editFieldUrl,
      data: value,
      ...token
    }).then(res => {
      callback();

      dispatch({
        type: "EDIT_FIELD",
        payload: { field: res.data }
      });
      dispatch(openSnackbars("success", "Operacion Exitosa"));
    });
  });
};

export const enabledField = values => dispatch => {
  getDataToken().then(token => {
    axios({
      method: "POST",
      url: enabledFieldUrl,
      data: values,
      ...token
    }).then(res => {
      dispatch(openSnackbars("success", "Operacion Exitosa"));
    });
  });
};

 //--------------------------PUSHER------------------------------//
 export const loadStoreServicesEditPusher = data => dispatch =>{
   getDataToken().then(datos =>{
     dispatch({
       type:"LOAD_SERVICES_EDIT_PUSHER",
       payload: {...data}
     })
   }).catch(() => {
     console.log("Problemas con el token");
   });
 }
