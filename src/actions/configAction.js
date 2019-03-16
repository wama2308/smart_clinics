import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
const url = `http://smartclinics.online/sc-admin/web/app.php`;
const loadMedicalCenter = `${url}/api/LoadMedicalCenter`;
const loadGeneralConfiguration = `${url}/api/loadGeneralConfiguration`;
const loadLicence = `${url}/LoadLicense`;
const LoadContries = `${url}/api/loadCountries`;
const SubmitDataMedicalCenter = `${url}/api/editPerfilMedicalCenter`;

const getDataToken = () => {
  return new Promise(resolve => {
    const token = window.localStorage.getItem("id_token");
    const datos = {
      headers: { "access-token": token }
    };
    resolve(datos);
  });
};

export const loadMedicalcenterAction = () => dispatch => {
  getDataToken().then(datos => {
    axios
      .get(loadMedicalCenter, datos)
      .then(res => {
        loadCountry(datos, country => {
          dispatch({
            type: "LOAD_MEDICAL_CENTER",
            payload: {
              loading: "hide",
              country,
              ...res.data.medical_center,
              licenses: res.data.licenses_array
            }
          });
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

const loadCountry = (datos, cb) => {
  axios
    .get(LoadContries, datos)
    .then(res => {
      cb(res.data);
    })
    .catch(error => {
      console.log(
        "Error consultando la api de paises para Paises",
        error.toString()
      );
    });
};

export const loadTypes = () => dispatch => {
  getDataToken().then(datos => {
    axios
      .get(loadGeneralConfiguration, datos)
      .then(res => {
        console.log("consultando el api2", res);
        dispatch({
          type: "SET_TYPE_CONFIGURATION",
          payload: {
            sector: res.data.sectormedicalcenter,
            type: res.data.typemedicalcenter
          }
        });
      })
      .catch(error => {
        console.log(error);
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

//       name: this.state.Sucursal,
//       idCountry: this.state.pais,
//       provinceid: this.state.valorProvince,
//       timeZ: this.state.timeZ
