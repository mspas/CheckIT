import React from "react";
import "../styles/dashboard.sass";
import AuthService from "../services/auth.service";
import withAuth from "../services/auth-guard.service";

class Dashboard extends React.Component {
  constructor() {
    super();
    this._auth = new AuthService();
  }

  handleLogout() {
    this._auth.logout();
    this.props.history.replace("/login");
  }

  render() {
    return (
      <div>
        ej
        <p>ejejejej</p>
        <button
          type="button"
          className="form-submit"
          onClick={this.handleLogout.bind(this)}
        >
          Logout
        </button>
      </div>
    );
  }
}
export default withAuth(Dashboard);
