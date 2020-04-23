import React from "react";
import "../../styles/home.sass";
import SignIn from "./Sign-in";
//import logo from "../../assets/coronaS.png";
import AuthService from "../../services/auth.service";
import { Container } from "react-bootstrap";

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
          <div className="center">
            <div className="slope slope1">
              <span>Sign In</span>
            </div>
            <div className="slope slope0"></div>
          </div>
          <div className="row panel-content">
            <SignIn history={this.props.history} />
          </div>
          <div className="footer-panel">
            <div className="slope slope2"></div>
            <p>
              Attendance Tracker <span>@2020</span>
            </p>
          </div>
        </div>
      </Container>
    );
  }
}
export default Home;
