import React from "react";
import "../../styles/sign-in.sass";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import AuthService from "../../services/auth.service";
import ApiServiceMock from "../../services/api.mock.service";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this._auth = new AuthService();
    this._authMock = new ApiServiceMock();

    this.state = { Email: "", Password: "" };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this._auth.setToken(this._authMock.getExampleToken());
    this.props.history.replace("/dashboard");
    /*this._auth
      .login(this.state.Email, this.state.Password)
      .then((res) => {
        this.props.history.replace("/dashboard");
      })
      .catch((err) => {
        alert(err);
      });*/
  };

  render() {
    return (
      <Form className="form-signin" onSubmit={this.onSubmit}>
        <Form.Group controlId="formEmail">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">
                <FontAwesomeIcon className="panel-icon" icon={faEnvelope} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              name="Email"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              onChange={this.handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please type your email address.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">
                <FontAwesomeIcon className="panel-icon" icon={faLock} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="password"
              name="Password"
              placeholder="Password"
              aria-describedby="inputGroupPrepend"
              onChange={this.handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please type your password.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    );
  }
}
export default SignIn;
