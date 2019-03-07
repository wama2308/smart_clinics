import decode from 'jwt-decode';
import axios from 'axios';
import { datosConexion } from './Conexion.js'

export default class AuthService {
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
        //this.domain = domain || 'http://smartclinics.online/sc-admin/web/app.php/' // API server domain
        //this.domain = domain || 'http://localhost:8000/' // API server domain
        this.fetch = this.fetch.bind(this) // React bining stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(_username, _password) {
        // Get a token from api server using the fetch api
        /*console.log(_username)*/
        const token={
            _username,
            _password,

            headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
            }

        }

        return axios.post(this.domain+'api/login', token)
        .then((res) => {
            this.setEmail(_username)
            this.setToken(res.data.token)
            /*console.log(res);*/
            return Promise.resolve(res);
        })

        // return this.fetch(`${this.domain}/api/login`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         _username,
        //         _password
        //     })
        // }).then(res => {
        //     console.log(res);
        //     console.log(res.token)
        //     this.setToken(res.token) // Setting the token in localStorage
        //     return Promise.resolve(res);
        // })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }
    setEmail(idemail){
        localStorage.setItem('email', idemail)
    }
    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
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
