import React from "react";
import "../styles/home.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import SignIn from "./Sign-in";
import Register from "./Register";
import logo from "../assets/coronaS.png";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      active: false
    };
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    return (
      <div className="container center">
        <div className="sign_in_panel">
          <div className="row panel_navbar">
            <div className="col">
              <div
                className={
                  !this.state.active ? "panel_nav" : "panel_nav nav_inactive"
                }
                onClick={this.toggleClass}
              >
                <FontAwesomeIcon className="panel_icon" icon={faUserTie} />
                <p>Login</p>
              </div>
            </div>
            <div className="col">
              <div
                className={
                  this.state.active ? "panel_nav" : "panel_nav nav_inactive"
                }
                onClick={this.toggleClass}
              >
                <FontAwesomeIcon className="panel_icon" icon={faUserPlus} />
                <p>Register</p>
              </div>
            </div>
          </div>
          <div
            className={
              this.state.active ? "row panel_content tet" : "row panel_content"
            }
          >
            <div
              className={this.state.active ? "slope slope1" : "slope slope0"}
            ></div>
            {!this.state.active && <SignIn />}
            {this.state.active && <Register />}
            <div className="slope2"></div>
          </div>
          <div className="footer_panel row">
            <div className="col center">
              <img src={logo} alt="Logo" height={50} />
            </div>
            <div className="col">
              <p>
                Attendance Tracker <span>@2020</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
