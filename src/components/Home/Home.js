import React from "react";
import "../../styles/home.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import SignIn from "./Sign-in";
import Register from "./Register";
import logo from "../assets/coronaS.png";
import AuthService from "../../services/auth.service";
import { Container, Row, Col } from "react-bootstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      active: false
    };
    this._auth = new AuthService();
  }

  componentDidMount() {
    if (this._auth.loggedIn()) this.props.history.replace("/");
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    return (
      <Container className="center">
        <div className="sign_in_panel">
          <Row className="panel_navbar">
            <Col>
              <div
                className={
                  !this.state.active ? "panel_nav" : "panel_nav nav_inactive"
                }
                onClick={this.toggleClass}
              >
                <FontAwesomeIcon className="panel_icon" icon={faUserTie} />
                <p>Login</p>
              </div>
            </Col>
            <Col>
              <div
                className={
                  this.state.active ? "panel_nav" : "panel_nav nav_inactive"
                }
                onClick={this.toggleClass}
              >
                <FontAwesomeIcon className="panel_icon" icon={faUserPlus} />
                <p>Register</p>
              </div>
            </Col>
          </Row>
          <div
            className={
              this.state.active ? "row panel_content tet" : "row panel_content"
            }
          >
            <div
              className={this.state.active ? "slope slope1" : "slope slope0"}
            ></div>
            {!this.state.active && <SignIn history={this.props.history} />}
            {this.state.active && <Register history={this.props.history} />}
            <div className="slope2"></div>
          </div>
          <Row className="footer_panel">
            <Col className="center">
              <img src={logo} alt="Logo" height={50} />
            </Col>
            <Col>
              <p>
                Attendance Tracker <span>@2020</span>
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}
export default Home;
