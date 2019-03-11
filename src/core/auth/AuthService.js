import decode from "jwt-decode";
import axios from "axios";

export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain;
  }

  login(_username, _password, notify, callback) {
    const token = {
      _username,
      _password,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      }
    };
    return axios
      .post(this.domain + "api/login", token)
      .then(async res => {
        const result = await decode(res.data.token);
        await this.setTokenInTheLocalStorage(_username);
        await this.setTokenInTheLocalStorage(res.data.token);

        callback({
          logged: true,
          ...result
        });
      })
      .catch(error => {
        notify(error.toString());
      });
  }

  async verify(callback){
    const token = await this.getToken();
    if (token) {
      const result = await decode(token);
      callback({
        logged: true,
        result
      });
    }
  } 

  async loggedIn(callback) {
    // Checks if there is a saved token and it's still valid
    const token = await this.getToken(); // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
  setEmail(idemail) {
    return localStorage.setItem("email", idemail);
  }

  SetUsernameInTheLocalStorage(idemail) {
    return localStorage.setItem("email", idemail);
  }

  setTokenInTheLocalStorage(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
