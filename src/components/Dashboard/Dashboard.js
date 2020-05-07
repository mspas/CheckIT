import React from "react";
import "../../styles/dashboard.sass";
import AuthService from "../../services/auth.service";
import CoursesSidebar from "./CoursesSidebar.container";
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
      loggedName: "",
      lecturesLoading: false,
      coursesLoading: true,
      presenceLoading: true,
      scheduleLoading: true,
      courseOverviewClicked: false,
      clickedLectureId: -1,
      lectureIndex: -1,
      courses: [],
      activeFlags: [],
      lectures: [],
      courseData: null,
      lectureData: null,
      overviewData: null,
      scheduleData: null,
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleLecturesForCourse = this.handleLecturesForCourse.bind(this);
  }

  componentDidMount() {
    this.setState({
      loggedName: localStorage.getItem("name"),
    });
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

    /*fetch(
      this.state.url + "/api/lecturers/" + this.state.lecturer_id + "/schedule",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          scheduleData: json,
          scheduleLoading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error database fetch data: courses");
      });*/
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.courseId !== prevProps.courseId) {
      this.setState({
        lecturesLoading: true,
        clickedLectureId: -1,
        courseOverviewClicked: false,
        isLoadingOverview: true,
      });
      this.handleLecturesForCourse(this.props.courseId);
    }
  }

  handleLogoutClick() {
    this._auth.logout(localStorage.getItem("id"), false).then((res) => {
      this.props.history.replace("/login");
    });
  }

  getLecturesSet(course_id) {
    for (let i = 0; i < this.state.courses.length; i++) {
      if (this.state.courses[i].id === course_id) return this.state.courses[i];
    }
    return [];
  }

  handleLecturesForCourse(course_id) {
    let lecturesSet = this.getLecturesSet(course_id);

    fetch(this.state.url + "/api/courses/" + course_id + "/details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          courseData: json,
          lectures: lecturesSet,
          lecturesLoading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error database fetch data: course data");
      });
  }

  render() {
    return (
      <div>
        <CoursesSidebar
          courses={this.state.courses}
          loggedName={this.state.loggedName}
          isLoading={this.state.coursesLoading}
        />
        <Container className="content">
          <Link className="btn-logout" to="" onClick={this.handleLogoutClick}>
            <span>Logout</span>
          </Link>
          <div className="main-container">
            <LectureList
              courseData={this.state.courseData}
              lectures={this.state.lectures}
              isLoading={this.state.lecturesLoading}
              courseOverviewClicked={this.state.courseOverviewClicked}
              overviewData={this.state.overviewData}
              isLoadingOverview={this.state.isLoadingOverview}
              courseId={this.props.courseId}
              lectureId={this.props.lectureId}
              changeLecture={this.props.changeLecture}
              eraseLecture={this.props.eraseLecture}
              onBackClick={this.handleBackClick}
              onOverviewClick={this.handleOverviewClick}
            />
          </div>
        </Container>
      </div>
    );
  }
}
export default Dashboard;
