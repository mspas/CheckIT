import React from "react";
import "../../styles/sign-in.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import AuthService from "../../services/auth.service";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this._auth = new AuthService();
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this._auth
      .login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.replace("/dashboard");
      })
      .catch(err => {
        alert(err);
      });
    /*fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/dashboard');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });*/
  };

  render() {
    return (
      <form className="form-signin" onSubmit={this.onSubmit}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <FontAwesomeIcon className="panel-icon" icon={faUserAlt} />
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={this.handleInputChange}
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <FontAwesomeIcon className="panel-icon" icon={faKey} />
            </span>
          </div>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
            onChange={this.handleInputChange}
          />
        </div>
        <button type="submit" className="btn mb-2">
          Login
        </button>
      </form>
    );
  }
}
export default SignIn;
