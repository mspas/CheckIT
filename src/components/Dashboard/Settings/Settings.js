import React from "react";
import { Form } from "react-bootstrap";
import ApiService from "../../../services/api.service";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this._api = new ApiService();
  }

  render() {
    return (
      <div>
        <p>sttings</p>
        <p>chuje</p>
      </div>
    );
  }
}
export default Settings;
