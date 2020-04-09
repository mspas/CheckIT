import React from "react";
import "../../styles/dashboard.sass";
import AuthService from "../../services/auth.service";
import withAuth from "../../services/auth-guard.service";
import CoursesSidebar from "./CoursesSidebar";
import { Link } from "react-scroll";
import { Container } from "react-bootstrap";
import ApiServiceMock from "../../services/api.mock.service";
import ApiService from "../../services/api.service";
import LectureList from "./LectureList";

class Dashboard extends React.Component {
  constructor() {
    super();
    this._auth = new AuthService();
    this._apiMock = new ApiServiceMock();
    this._api = new ApiService();

    this.state = {
      url: "http://25.23.181.97:8090",
      lecturer_id: 5,
      logged: localStorage.getItem("id_token"),
      lecturesLoading: true,
      coursesLoading: true,
      courses: [],
      courseData: null,
      lectures: [],
      activeFlags: [],
    };

    this.handleCourseClick = this.handleCourseClick.bind(this);
    this.handleLinks = this.handleLinks.bind(this);
    this.handleLectures = this.handleLectures.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  componentDidMount() {
    fetch(
      this.state.url + "/api/lecturers/" + this.state.lecturer_id + "/courses",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        let array = [];
        if (json.courses.length > 0) {
          for (let i = 0; i < json.courses.length; i++) {
            array.push(false);
          }
        }
        this.setState({
          courses: json.courses,
          coursesLoading: false,
          activeFlags: array,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error database fetch data: courses");
      });
    /*this._api.getCoursesForLecturer(this.state.lecturer_id).then((res) => {
      let array = [];
      if (res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          array.push(false);
        }
      }
      this.setState({
        courses: res,
        coursesLoading: false,
        activeFlags: array,
      });
    });*/
  }

  handleLogoutClick() {
    this._auth.logout();
    this.props.history.replace("/login");
  }

  handleCourseClick(data, index) {
    this.handleLinks(data.id, index);
  }

  handleLinks(course_id, index) {
    let array = this.state.activeFlags;
    for (let i = 0; i < array.length; i++) {
      array[i] = false;
    }
    this.setState(
      {
        activeFlags: array,
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
      activeFlags: array,
    });

    fetch(this.state.url + "/api/courses/" + "1" + "/details", {
      /////////// HARDCODE !!!!!!!!!!!!!!!
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          courseData: json,
          lectures: this.state.courses[index].lectures,
          lecturesLoading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error database fetch data: course data");
      });

    /*this._api.getCourseData(course_id).then((res) => {
      this.setState({
        courseData: res,
        lectures: this.state.courses[index],
        lecturesLoading: false,
      });
    });*/
  }

  render() {
    return (
      <div>
        <CoursesSidebar
          history={this.props.history}
          courses={this.state.courses}
          isLoading={this.state.coursesLoading}
          activeFlags={this.state.activeFlags}
          onCourseClick={this.handleCourseClick}
        />
        <Container className="content">
          <div className="app-info">
            <span>Logged as {this.state.logged}</span>
            <Link to="" onClick={this.handleLogoutClick}>
              Logout
            </Link>
          </div>
          <div className="main-container">
            <LectureList
              courseData={this.state.courseData}
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
