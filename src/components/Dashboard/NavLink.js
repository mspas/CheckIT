import React from "react";
import "../../styles/dashboard.sass";

class NavLink extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout() {
    this._auth.logout();
    this.props.history.replace("/login");
  }

  render() {
    return (
      <li
        className={this.props.active ? "nav-item nav-elem active" : "nav-elem"}
        data-name={this.props.name}
        onClick={this.props.onClick}
      >
        {this.props.name}
      </li>
    );
  }
}
export default NavLink;
