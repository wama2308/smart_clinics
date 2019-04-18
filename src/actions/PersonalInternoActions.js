/*import axios from "axios";
import { openSnackbars } from "./aplicantionActions";
import { url, getDataToken } from "../core/connection";
const loadCountriesArray = `${url}/api/loadCountriesArray`;

export const LoadPersonalCargosFunction = () => dispatch => {
  getDataToken()
    .then(datos => {
    	axios.get(listCountryProvider, datos)
    	.then(res => {
		    loadCountriesArrayFunction(datos, arrayPaises => {
          queryNationalPaymentsFunction(datos, nationalPayments => {
            dispatch({
              type: "LOAD_DISTRIBUTOR",
              payload: {
                loading: "hide",
                data: res.data,
                paises: arrayPaises,
                typeIdentity: nationalPayments,                      
                contacs: [],
                tableContac: 0
              }
            });
          });  
        });  				
    	})
        .catch(error => {
  			console.log("Error consultando la api de usuarios no master",error.toString());
        });
      
    })
    .catch(() => {
      console.log("Problemas con el token");
    });
};*/