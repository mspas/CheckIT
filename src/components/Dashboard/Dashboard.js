import React from "react";
import "../../styles/dashboard.sass";
import AuthService from "../../services/auth.service";
import Sidebar from "./Sidebar.container";
import { Link } from "react-scroll";
import { Container } from "react-bootstrap";
import ApiServiceMock from "../../services/api.mock.service";
import CourseView from "./CourseView";
import WeekSchedule from "./WeekSchedule";
import DataService from "../../services/data.service";

class Dashboard extends React.Component {
  constructor() {
    super();
    this._auth = new AuthService();
    this._apiMock = new ApiServiceMock();
    this._data = new DataService();

    this.state = {
      url: "http://25.23.181.97:8090",
      lecturer_id: this._auth.getUserId(this._auth.getToken()),
      loggedName: this._auth.getUserId(this._auth.getToken()),
      lecturesLoading: false,
      coursesLoading: true,
      scheduleLoading: true,
      courses: [],
      lectures: [],
      courseData: null,
      scheduleData: null,
      dateString: "",
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleLecturesForCourse = this.handleLecturesForCourse.bind(this);
  }

  componentDidMount() {
    this._auth
      .fetch(
        this.state.url +
          "/api/lecturers/" +
          this.state.lecturer_id +
          "/courses",
        { method: "GET" }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          courses: res.courses,
          coursesLoading: false,
        });
      });

    fetch(
      this.state.url + "/api/lecturers/" + this.state.lecturer_id + "/schedule",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": "Bearer " + this._auth.getToken(),
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        let date1 = new Date(json.schedule[0].date);
        let date2 = new Date(json.schedule[6].date);
        let date =
          ("0" + date1.getDate()).slice(-2) +
          " " +
          this._data.getMonthName(date1.getMonth()) +
          " - " +
          ("0" + date2.getDate()).slice(-2) +
          " " +
          this._data.getMonthName(date2.getMonth());
        this.setState({
          scheduleData: json,
          scheduleLoading: false,
          dateString: date,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error database fetch data: schedule");
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.courseId !== prevProps.courseId) {
      this.setState({
        lecturesLoading: true,
      });
      if (this.props.courseId !== -1)
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
        "X-Authorization": "Bearer " + this._auth.getToken(),
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
        <Sidebar
          courses={this.state.courses}
          loggedName={this.state.loggedName}
          isLoading={this.state.coursesLoading}
        />
        <Container className="content">
          <Link className="btn-logout" to="" onClick={this.handleLogoutClick}>
            <span>Logout</span>
          </Link>
          <div className="main-container">
            <div className="course-name slope slope3">
              {this.state.dateString}
            </div>
            <div className="course-code slope slope4">Schedule</div>
            {this.props.courseId !== -1 ? (
              <CourseView
                courseData={this.state.courseData}
                lectures={this.state.lectures}
                isLoading={this.state.lecturesLoading}
                courseId={this.props.courseId}
                lectureId={this.props.lectureId}
                changeLecture={this.props.changeLecture}
                eraseLecture={this.props.eraseLecture}
              />
            ) : (
              <WeekSchedule
                scheduleData={this.state.scheduleData}
                isLoading={this.state.scheduleLoading}
              />
            )}
          </div>
        </Container>
      </div>
    );
  }
}
export default Dashboard;
