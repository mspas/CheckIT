import React from "react";
import { Form, Button } from "react-bootstrap";
import ApiService from "../../../services/api.service";

class CourseSettings extends React.Component {
  constructor(props) {
    super(props);
    this._api = new ApiService();
  }

  render() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Course name</Form.Label>
          <Form.Control type="text" placeholder={this.props.course.name} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Course name</Form.Label>
          <Form.Control type="text" placeholder={this.props.course.name} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
export default CourseSettings;
