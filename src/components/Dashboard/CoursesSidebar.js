import React from "react";
import "../../styles/course.sass";
import { Link } from "react-scroll";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class CoursesSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFlags: [],
    };
    this.onCourseClick = this.onCourseClick.bind(this);
  }

  componentDidMount() {
    if (this.props.courses.length > 0) this.setDefaultFlags();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.courses !== prevProps.courses) {
      this.setDefaultFlags();
    }
    if (this.props.courseId !== prevProps.courseId) {
      this.setDefaultFlags();
    }
  }

  setDefaultFlags() {
    return new Promise((resolve, reject) => {
      let temp = [];
      for (let i = 0; i < this.props.courses.length; i++) {
        temp.push(false);
      }
      this.setState(
        {
          activeFlags: temp,
        },
        () => {
          resolve(this.state.activeFlags);
        }
      );
    });
  }

  setActiveFlag(index) {
    this.setDefaultFlags().then((res) => {
      res[index] = true;
      this.setState({
        activeFlags: res,
      });
    });
  }

  onCourseClick(data, index) {
    this.setActiveFlag(index);
    this.props.changeCourse(data.id);
    this.props.eraseLecture();
  }

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
              this.state.activeFlags[index] ? "list-elem active" : "list-elem"
            }
            to=""
            onClick={this.onCourseClick.bind(null, data, index)}
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
            <button className="course-name" onClick={this.handleClick}>
              Your Week Schedule
            </button>
          </Link>
          <ul>{courses}</ul>
        </div>
      </div>
    );
  }
}
export default CoursesSidebar;
