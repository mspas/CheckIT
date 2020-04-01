import React from "react";
import "../../styles/dashboard.sass";
import AuthService from "../../services/auth.service";
import withAuth from "../../services/auth-guard.service";
import NavbarCourses from "./NavbarCourses";
import { Link } from "react-scroll";
import { Container } from "react-bootstrap";
import ApiService from "../../services/api.service";
import LectureList from "./Course/Lecture/LectureList";

class Dashboard extends React.Component {
  constructor() {
    super();
    this._auth = new AuthService();
    this._api = new ApiService();

    let lecturer_id = 0;

    this.state = {
      logged: localStorage.getItem("id_token"),
      lecturesLoading: true,
      coursesLoading: true,
      lectures: [],
      activeFlags: []
    };

    this._api.getCourses(lecturer_id).then(res => {
      let array = [];
      if (res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          array.push(false);
        }
      }
      this.setState({
        courses: res,
        coursesLoading: false,
        activeFlags: array
      });
    });

    this.handleCourseClick = this.handleCourseClick.bind(this);
    this.deactivateAllLinks = this.deactivateAllLinks.bind(this);
    this.handleLectures = this.handleLectures.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this._auth.logout();
    this.props.history.replace("/login");
  }

  handleCourseClick(data, index) {
    this.deactivateAllLinks(data.id, index);
  }

  deactivateAllLinks(course_id, index) {
    let array = this.state.activeFlags;
    for (let i = 0; i < array.length; i++) {
      array[i] = false;
    }
    this.setState(
      {
        activeFlags: array
      },
      () => {
        this.handleLectures(course_id, index);
      }
    );
  }

  handleLectures(course_id, index) {
    let array;
    array = this.state.activeFlags;
    array[index] = true;
    this.setState({
      activeFlags: array
    });

    this._api.getLectures(course_id).then(res => {
      this.setState({ lectures: res, lecturesLoading: false });
    });
  }

  render() {
    return (
      <div>
        <NavbarCourses
          history={this.props.history}
          courses={this.state.courses}
          isLoading={this.state.coursesLoading}
          activeFlags={this.state.activeFlags}
          onCourseClick={this.handleCourseClick}
        />
        <Container className="content">
          <div className="app-info">
            <span>Logged as {this.state.logged}</span>
            <Link to="" onClick={this.handleLogout}>
              Logout
            </Link>
          </div>
          <div className="main-container">
            <LectureList
              lectures={this.state.lectures}
              isLoading={this.state.lecturesLoading}
            />
          </div>
        </Container>
      </div>
    );
  }
}
export default withAuth(Dashboard);
