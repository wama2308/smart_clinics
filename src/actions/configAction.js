import axios from "axios";

const url = `http://smartclinics.online/sc-admin/web/app.php`;
const loadMedicalCenter = `${url}/api/LoadMedicalCenter`;
const loadLicence = `${url}/LoadLicense`;
const LoadContries = `${url}/api/loadCountries`;
const SubmitDataMedicalCenter = `${url}/api/editPerfilMedicalCenter`;
const token = window.localStorage.getItem("id_token");

const datos = {
  headers: { "access-token": token }
};

export const loadMedicalcenterAction = () => dispatch => {
  console.log(loadMedicalCenter, datos);
  axios
    .get(loadMedicalCenter, datos)
    .then(res => {
      loadCountry(country => {
        dispatch({
          type: "LOAD_MEDICAL_CENTER",
          payload: {
            loading: "hide",
            country,
            ...res.data
          }
        });
      });
    })
    .catch(error => {
      console.log("Error consultando la api medical center", error.toString());
    });
};

const loadCountry = cb => {
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

export const editMedicalCenter = data => dispatch => {
   console.log(data)
  // axios({
  //   method: "post",
  //   url: SubmitDataMedicalCenter,
  //   data: data,
  //   headers: { "access-token": token }
  // })
  //   .then(() => {})
  //   .catch(error => {
  //     //console.log(res, this.state.valorProvince)
  //     console.log("Error modificando el medical center", error);
  //   });
};

//       name: this.state.Sucursal,
//       idCountry: this.state.pais,
//       provinceid: this.state.valorProvince,
//       timeZ: this.state.timeZ

