import React from "react";
import "../../styles/home.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import SignIn from "./Sign-in";
import Register from "./Register";
import logo from "../../assets/coronaS.png";
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
        <div className="sign-in-panel">
          <Row className="panel-navbar">
            <Col>
              <div
                className={
                  !this.state.active ? "panel-nav" : "panel-nav nav-inactive"
                }
                onClick={this.toggleClass}
              >
                <FontAwesomeIcon className="panel-icon" icon={faUserTie} />
                <p>Login</p>
              </div>
            </Col>
            <Col>
              <div
                className={
                  this.state.active ? "panel-nav" : "panel-nav nav-inactive"
                }
                onClick={this.toggleClass}
              >
                <FontAwesomeIcon className="panel-icon" icon={faUserPlus} />
                <p>Register</p>
              </div>
            </Col>
          </Row>
          <div
            className={
              this.state.active ? "row panel-content tet" : "row panel-content"
            }
          >
            <div
              className={this.state.active ? "slope slope1" : "slope slope0"}
            ></div>
            {!this.state.active && <SignIn history={this.props.history} />}
            {this.state.active && <Register history={this.props.history} />}
            <div className="slope2"></div>
          </div>
          <Row className="footer-panel">
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
