import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { getDataToken, url } from "../core/connection";
const loadMedicalCenter = `${url}/api/LoadMedicalCenter`;
const loadGeneralConfiguration = `${url}/api/loadGeneralConfiguration`;
const loadLicence = `${url}/LoadLicense`;
const LoadContries = `${url}/api/loadCountries`;
const SubmitDataMedicalCenter = `${url}/api/editPerfilMedicalCenter`;
const saveSucursal = `${url}/api/saveBranchOffices`;
const deleteSucursalApi = `${url}/api/deleteBranchOffices`;
const editBranchUrl = `${url}/api/editBranchOffices`;
const enabledBranchOffices = `${url}/api/enabledBranchOffices`;

export const loadMedicalcenterAction = () => dispatch => {
  getDataToken().then(datos => {
    axios
      .get(loadMedicalCenter, datos)
      .then(res => {
        dispatch({
          type: "LOAD_MEDICAL_CENTER",
          payload: {
            loading: "hide",
            ...res.data.medical_center,
            licenses: res.data.licenses_array
          }
        });
      })
      .catch(error => {
        console.log(
          "Error consultando la api medical center",
          error.toString()
        );
      });
  });
};

export const editMedicalCenter = (data, callback) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: SubmitDataMedicalCenter,
      data: data,
      ...datos
    })
      .then(() => {
        callback();
        dispatch(openSnackbars("success", "Operacion Exitosa"));
      })
      .catch(error => {
        dispatch(openSnackbars("error", "Error modificando el medical center"));
      });
  });
};

export const setDataSucursal = (data, close) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: saveSucursal,
      data: data,
      ...datos
    })
      .then(res => {
        dispatch(openSnackbars("success", "Operacion Exitosa"));
        close();
      })
      .catch(error => {
        dispatch(openSnackbars("error", error.toString()));
      });
  });
};

export const deleteSucursal = (key, time) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: deleteSucursalApi,
      data: {
        _id: key._id,
        timeZ: time
      },
      ...datos
    })
      .then(res => {
        dispatch(openSnackbars("success", "Operacion Exitosa"));
      })
      .catch(res => {});
  });
};

export const activeBranch = key => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: enabledBranchOffices,
      data: {
        _id: key._id
      },
      ...datos
    })
      .then(res => {
        dispatch(openSnackbars("success", "Operacion Exitosa"));
      })
      .catch(res => {});
  });
};

export const branchEdit = (data, callback) => dispatch => {
  getDataToken().then(datos => {
    axios({
      method: "post",
      url: editBranchUrl,
      data: data,
      ...datos
    })
      .then(() => {
        dispatch(openSnackbars("success", "Operacion Exitosa"));
        callback();
      })
      .catch(error => {
        dispatch(openSnackbars("error", error.toString()));
      });
  });
};

export const enableBranchs = data => dispatch => {
  console.log("enable", data);
};

export const disabledBranchs = data => dispatch => {
  console.log("disabled", data);
};

export const SetDataSave = data => {
  return {
    type: "SET_DATA_BRACHN_OFFICE",
    payload: data
  };
};

//       name: this.state.Sucursal,
//       idCountry: this.state.pais,
//       provinceid: this.state.valorProvince,
//       timeZ: this.state.timeZ
