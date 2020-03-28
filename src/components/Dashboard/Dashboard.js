import React from "react";
import "../../styles/dashboard.sass";
import AuthService from "../../services/auth.service";
import withAuth from "../../services/auth-guard.service";
import logo from "../../assets/coronaS.png";
import NavLink from "./NavLink";
import DashboardContent from "./DashboardContent";
import { Link } from "react-scroll";
import { Navbar, Container, NavDropdown, Nav, Dropdown } from "react-bootstrap";

class Dashboard extends React.Component {
  constructor() {
    super();
    this._auth = new AuthService();

    let lecturer_id = 0;

    this.state = {
      logged: localStorage.getItem("id_token"),
      activeFlag: 0,
      isLoading: true,
      linksData: [
        { name: "My courses", active: true },
        { name: "New course", active: false },
        { name: "Settings", active: false }
      ]
    };

    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this._auth.logout();
    this.props.history.replace("/login");
  }

  handleLinkClick(index, event) {
    let array = this.state.linksData;

    array.forEach(element => {
      element.active = false;
    });
    array[index].active = true;

    this.setState({
      activeFlag: index,
      linksData: array
    });
  }

  deactivateAllLinks() {
    this.setState({
      linksData: [
        { name: "My courses", active: false },
        { name: "New course", active: false },
        { name: "Settings", active: false }
      ]
    });
  }

  render() {
    let links = this.state.linksData.map((data, index) => {
      return (
        <NavLink
          onClick={this.handleLinkClick.bind(null, index)}
          active={data.active}
          name={data.name}
          key={index}
        />
      );
    });
    return (
      <Container className="main">
        <div className="app-info">
          <img src={logo} alt="Logo" height={50} />
          <span>Logged as {this.state.logged}</span>
        </div>
        <div className="main-container">
          <Navbar
            sticky="top"
            id="navbar"
            bg="light"
            expand="lg"
            className="navbar navbar-expand-lg navbar-light bg-light"
            collapseOnSelect={true}
          >
            <Navbar.Toggle
              className="ml-auto"
              aria-controls="basic-navbar-nav"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                {links}
                <Link className="nav-elem" to="" onClick={this.handleLogout}>
                  Logout
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <DashboardContent
            history={this.props.history}
            linksData={this.state.linksData}
            isLoading={this.state.isLoading}
          />
        </div>
      </Container>
    );
  }
}
export default withAuth(Dashboard);
