import decode from 'jwt-decode';
import axios from 'axios';
import { datosConexion } from './Conexion.js'

export default class GeneralConfiguration {
    // Initializing important variables
    constructor(domain) {

        let valueConexion = "";
        let arrayConexion = Object.values(datosConexion);
        arrayConexion.forEach(function (elemento, indice, array) {
            if(indice === 1){
                valueConexion = elemento;
            }            
        });        
        
        this.domain = domain || valueConexion
        this.selectGeneral = this.selectGeneral.bind(this)        
    }

    selectGeneral() {
        // Get a token from api server using the fetch api
        /*console.log(_username)*/
        const token = window.localStorage.getItem('id_token');
        const datos={
            headers:
            {'access-token' : token }
        }

        return axios.get(this.domain+'api/queryGeneral', datos)
        .then((res) => {
            
            return Promise.resolve(res);

        })       
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
