import React from "react";
import "../styles/sign-in.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";

class SignIn extends React.Component {
  render() {
    return (
      <form className="form-signin">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <FontAwesomeIcon className="panel-icon" icon={faUserAlt} />
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
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
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
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
