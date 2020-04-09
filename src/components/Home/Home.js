import React from "react";
import "../../styles/home.sass";
import SignIn from "./Sign-in";
import logo from "../../assets/coronaS.png";
import AuthService from "../../services/auth.service";
import { Container, Row, Col } from "react-bootstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      active: false,
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
          <div className="panel-nav center">
            Sign In
            <div className="slope slope1"></div>
          </div>
          <div className="row panel-content">
            <SignIn history={this.props.history} />
          </div>
          <Row className="footer-panel">
            <div className="slope slope2"></div>
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
