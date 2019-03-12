import axios from "axios";

const url = `http://smartclinics.online/sc-admin/web/app.php`;
const loadMedicalCenter = `${url}/api/LoadMedicalCenter`;
const loadLicence = `${url}/LoadLicense`;
const LoadContries = `${url}/api/loadCountries`;
const token = window.localStorage.getItem("id_token");

const datos = {
  headers: { "access-token": token }
};

export const loadMedicalcenterAction = () => dispatch => {
  console.log(loadMedicalCenter, datos);
  axios
    .get(loadMedicalCenter, datos)
    .then(res => {
      loadCountry(res.data.countryid, provincia => {
        dispatch({
          type: "LOAD_MEDICAL_CENTER",
          payload: {
            loading: "hide",
            provincia,
            ...res.data
          }
        });
      });
    })
    .catch(error => {
      console.log("Error consultando la api medical center", error.toString());
    });
};

const loadCountry = (id, cb) => {
  axios({
    method: "post",
    url: LoadContries,
    data: {
      idCountry: id
    },
    headers: { "access-token": token }
  })
    .then(res => {
      cb(res.data);
    })
    .catch(error => {
      console.log("Error consultando la api de paises para provincias", error.toString());
    });
};
