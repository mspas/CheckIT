import React from "react";
import "../../styles/register.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

class Register extends React.Component {
  render() {
    return (
      <form className="form-signup">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <FontAwesomeIcon className="panel-icon" icon={faEnvelope} />
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <FontAwesomeIcon className="panel-icon" icon={faLock} />
            </span>
          </div>
          <input
            type="password"
            className="form-control"
            placeholder="Institution code"
            aria-label="Institution code"
            aria-describedby="basic-addon1"
          />
        </div>
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
          Create account
        </button>
      </form>
    );
  }
}
export default Register;
