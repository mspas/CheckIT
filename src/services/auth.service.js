import decode from "jwt-decode";
import ApiServiceMock from "./api.mock.service";

export default class AuthService {
  constructor(domain) {
    this._apiMock = new ApiServiceMock();

    this.domain = "http://25.23.181.97:8090";
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.getName = this.getName.bind(this);
    this.getEmail = this.getEmail.bind(this);
  }

  login(email, password) {
    this.setToken(this._apiMock.getExampleToken());
    return Promise.resolve(this._apiMock.getExampleToken());

    /*return this.fetch(`${this.domain}/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      console.log(res.token);
      this.setToken(res.token);
      return Promise.resolve(res);
    });*/
  }

  loggedIn() {
    const token = this.getToken();
    //return !!token && !this.isTokenExpired(token);
    let check = token ? true : false;
    return check;
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUserId(token) {
    return 5;
    /*try {
      const decoded = decode(token);
      return decoded.userId;
    } catch (err) {
      return null;
    }*/
  }

  getName(token) {
    try {
      const decoded = decode(token);
      return decoded.name;
    } catch (err) {
      return null;
    }
  }

  getEmail(token) {
    try {
      const decoded = decode(token);
      return decoded.sub;
    } catch (err) {
      return null;
    }
  }

  logout(id, logged) {
    localStorage.removeItem("token");
    return Promise.resolve(true);

    /*return this.fetch(`${this.domain}/api/logout`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Authorization": "Bearer " + this.getToken(),
      },
      body: JSON.stringify({
        id,
        logged,
      }),
    }).then((res) => {
      localStorage.removeItem("token");
      return Promise.resolve(res);
    });*/
  }

  fetch(url, options) {
    const headers = {
      //Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (this.loggedIn()) {
      headers["X-Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then((response) => response.json());
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      alert("Error database fetch data");
      throw error;
    }
  }
}
