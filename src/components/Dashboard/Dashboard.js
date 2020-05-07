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

    this.handleCourseClick = this.handleCourseClick.bind(this);
    this.handleLectureClick = this.handleLectureClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleOverviewClick = this.handleOverviewClick.bind(this);
    this.handleScheduleClick = this.handleScheduleClick.bind(this);
    this.handleActiveLinks = this.handleActiveLinks.bind(this);
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

    fetch(
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
      });
  }

  render() {
    return (
      <div>
        <CoursesSidebar
          history={this.props.history}
          courses={this.state.courses}
          loggedName={this.state.loggedName}
          isLoading={this.state.coursesLoading}
          activeFlags={this.state.activeFlags}
          onCourseClick={this.handleCourseClick}
          onScheduleClick={this.onScheduleClick}
        />
        <Container className="content">
          <Link className="btn-logout" to="" onClick={this.handleLogoutClick}>
            <span>Logout</span>
          </Link>
          <div className="main-container">
            <LectureList
              courseData={this.state.courseData}
              lectures={this.state.lectures}
              lectureIndex={this.state.lectureIndex}
              isLoading={this.state.lecturesLoading}
              presenceLoading={this.state.presenceLoading}
              clickedLectureId={this.state.clickedLectureId}
              lectureData={this.state.lectureData}
              courseOverviewClicked={this.state.courseOverviewClicked}
              overviewData={this.state.overviewData}
              isLoadingOverview={this.state.isLoadingOverview}
              onLectureClick={this.handleLectureClick}
              onBackClick={this.handleBackClick}
              onOverviewClick={this.handleOverviewClick}
            />
          </div>
        </Container>
      </div>
    );
  }

  handleLogoutClick() {
    this._auth.logout(localStorage.getItem("id"), false).then((res) => {
      this.props.history.replace("/login");
    });
  }

  handleScheduleClick() {}

  handleCourseClick(data, index) {
    this.setState({
      lecturesLoading: true,
      clickedLectureId: -1,
      courseOverviewClicked: false,
      isLoadingOverview: true,
    });
    this.handleActiveLinks(data.id, index);
  }

  handleLectureClick(data, index, event) {
    fetch(this.state.url + "/api/lectures/" + data.id + "/details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          clickedLectureId: index + 1,
          lectureIndex: index + 1,
          lectureData: json,
          presenceLoading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error database fetch data: lecture data");
      });
  }
  handleBackClick() {
    this.setState({
      clickedLectureId: -1,
      courseOverviewClicked: false,
      isLoadingOverview: true,
    });
  }

  handleActiveLinks(course_id, index) {
    let array = this.state.activeFlags;
    for (let i = 0; i < array.length; i++) {
      array[i] = false;
    }
    this.setState(
      {
        activeFlags: array,
      },
      () => {
        this.handleLecturesForCourse(course_id, index);
      }
    );
  }

  handleLecturesForCourse(course_id, index) {
    let array;
    array = this.state.activeFlags;
    array[index] = true;
    this.setState({
      activeFlags: array,
    });

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
          lectures: this.state.courses[index],
          lecturesLoading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error database fetch data: course data");
      });
  }

  handleOverviewClick() {
    fetch(
      this.state.url +
        "/api/courses/" +
        this.state.courseData.courseId +
        "/summary",
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
          overviewData: json,
          courseOverviewClicked: true,
          isLoadingOverview: false,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error database fetch data: lecture data");
      });
  }
}
export default withAuth(Dashboard);
