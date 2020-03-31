import React from "react";
import "../../../styles/course.sass";
import { Link } from "react-scroll";
import ApiService from "../../../services/api.service";
import LectureList from "./Lecture/LectureList";
import CourseSettings from "./CourseSettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

class CoursesList extends React.Component {
  constructor(props) {
    super(props);
    this._api = new ApiService();

    let lecturer_id = 0;

    this.state = {
      clickedCourseId: -1,
      clickedSettingsId: -1,
      selectedCourse: null,
      isLoading: true,
      selectedLectures: []
    };

    this._api.getCourses(lecturer_id).then(res => {
      this.setState({ courses: res, coursesLoading: false });
    });
    this._api.getLectures(lecturer_id).then(res => {
      this.setState({ allLectures: res, isLoading: false });
    });

    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleLinkClick(data, event) {
    this.setState({
      clickedCourseId: data.id,
      clickedSettingsId: -1,
      selectedCourse: data
    });

    this._api.getLectures(data.id).then(res => {
      this.setState({ selectedLectures: res, isLoading: false });
    });
  }

  handleSettingsClick(data, event) {
    this.setState({
      clickedCourseId: -1,
      clickedSettingsId: data.id,
      selectedCourse: data
    });

    this._api.getLectures(data.id).then(res => {
      this.setState({ selectedLectures: res, isLoading: false });
    });
    this._api.getUsersForLecture().then(res => {
      this.setState({ students: res, isLoadingUsers: false });
    });
    this._api.getUsers().then(res => {
      this.setState({ allStudents: res, isLoadingUsers: false });
    });
  }

  handleBackClick() {
    this.setState({
      clickedCourseId: -1,
      clickedSettingsId: -1
    });
  }

  render() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>;
    }

    let courses = this.props.courses.map((data, index) => {
      return (
        <Link
          className="list-elem"
          to=""
          key={index}
          onClick={this.handleLinkClick.bind(null, data)}
        >
          <span className="course-name">{data.name}</span>
          <Link to="" onClick={this.handleSettingsClick.bind(null, data)}>
            <FontAwesomeIcon className="panel-icon" icon={faCog} />
          </Link>
        </Link>
      );
    });

    return (
      <div className="center">
        {this.state.clickedCourseId === -1 &&
          this.state.clickedSettingsId === -1 && (
            <div className="list">{courses}</div>
          )}
        {this.state.clickedCourseId !== -1 &&
          this.state.clickedSettingsId === -1 && (
            <div>
              <Link to="" onClick={this.handleBackClick}>
                -back-
              </Link>
              <LectureList
                lectures={this.state.selectedLectures}
                isLoading={this.state.isLoading}
              />
            </div>
          )}
        {this.state.clickedSettingsId !== -1 &&
          this.state.clickedCourseId === -1 && (
            <div>
              <Link to="" onClick={this.handleBackClick}>
                -back-
              </Link>
              <CourseSettings
                lectures={this.state.selectedLectures}
                course={this.state.selectedCourse}
                isLoading={this.state.isLoading}
              />
            </div>
          )}
      </div>
    );
  }
}
export default CoursesList;
