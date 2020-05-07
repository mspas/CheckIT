import React from "react";
import "../../styles/course.sass";
import { Link } from "react-scroll";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class CoursesSidebar extends React.Component {
  render() {
    if (this.props.isLoading) {
      return (
        <div className="wrapper">
          <div className="course-menu">
            <div className="logo">logo</div>
            <p className="title-text">Your courses</p>
            <div className="spinner-wrap center">
              <Spinner
                animation="border"
                variant="primary"
                role="status"
              ></Spinner>
            </div>
          </div>
        </div>
      );
    }

    let courses = this.props.courses.map((data, index) => {
      return (
        <li key={index}>
          <Link
            className={
              this.props.activeFlags[index] ? "list-elem active" : "list-elem"
            }
            to=""
            onClick={this.props.onCourseClick.bind(null, data, index)}
          >
            <span className="course-name">{data.name}</span>
          </Link>
        </li>
      );
    });

    return (
      <div className="wrapper">
        <div className="course-menu">
          <div className="logo">logo</div>
          <p className="logged-user">Welcome, {this.props.loggedName}</p>
          <span>
            <FontAwesomeIcon className="panel-icon" icon={faBars} />
          </span>
          <Link
            className="btn-schedule"
            to=""
            onClick={this.props.onScheduleClick}
          >
            <span className="course-name">Your Week Schedule</span>
          </Link>
          <ul>{courses}</ul>
        </div>
      </div>
    );
  }
}
export default CoursesSidebar;
