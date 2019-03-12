import axios from 'axios'


const url = `http://smartclinics.online/sc-admin/web/app.php`
const loadMedicalCenter = `${url}/api/LoadMedicalCenter`
const loadLicence = `${url}/LoadLicense`
const LoadContries = `${url}/loadCountries`
const token = window.localStorage.getItem("id_token");

const datos = {
    headers: { "access-token": token }
};


export const loadMedicalcenterAction = () => dispatch => { 
  axios
    .get(loadMedicalCenter, datos)
    .then(res => {
       dispatch({
         type:'LOAD_MEDICAL_CENTER',
         payload: res.data
       })
    })
    .catch(error => {
      console.log("Error consultando la api medical center");
    });
}
  

