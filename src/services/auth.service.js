import decode from "jwt-decode";
export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = "http://25.23.181.97:8090";
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getEmail = this.getEmail.bind(this);
  }

  login(email, password) {
    // Get a token from api server using the fetch api
    return this.fetch(`${this.domain}/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      this.setToken(res.token);
      localStorage.setItem("id", res.id);
      localStorage.setItem("name", res.name);
      return Promise.resolve(res);
    });
    //localStorage.setItem("id_token", username);
    //return Promise.resolve(true);
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    //return !!token && !this.isTokenExpired(token); // handwaiving here
    let check = token ? true : false;
    return check;
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  getId(token) {
    try {
      const decoded = decode(token);
      console.log(JSON.stringify(decoded));
      return decoded.userId;
    } catch (err) {
      return null;
    }
  }

  getEmail() {
    let token = this.getToken();
    try {
      const decoded = decode(token);
      return decoded.sub;
    } catch (err) {
      return null;
    }
  }

  logout(id, logged) {
    //let id = 38;
    // Clear user token and profile data from localStorage
    //let id = this.getId(this.getToken());

    return this.fetch(`${this.domain}/api/logout`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //Authorization: "Bearer " + this.getToken(),
      },
      body: JSON.stringify({
        id,
        logged,
      }),
    }).then((res) => {
      localStorage.removeItem("id_token");
      localStorage.removeItem("name");
      localStorage.removeItem("id");
      return Promise.resolve(res);
    });
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    //return decode(this.getToken());
    return true;
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then((response) => response.json());
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
