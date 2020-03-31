import React from "react";
import "../../styles/sign-in.sass";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import AuthService from "../../services/auth.service";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Email: "", Password: "" };
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
      .login(this.state.Email, this.state.Password)
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
