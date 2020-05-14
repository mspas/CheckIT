import React from "react";
import "../../styles/sidebar.sass";
import { Link } from "react-scroll";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFlags: [],
      sidebarHidden: false,
    };
    this.onCourseClick = this.onCourseClick.bind(this);
    this.onScheduleClick = this.onScheduleClick.bind(this);
    this.slideSidebar = this.slideSidebar.bind(this);
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

  onScheduleClick() {
    this.setDefaultFlags();
    this.props.eraseCourse();
    this.props.eraseLecture();
  }

  slideSidebar() {
    this.setState(
      {
        sidebarHidden: !this.state.sidebarHidden,
      },
      () => {
        document.getElementById("sidebar").style.left = this.state.sidebarHidden
          ? "0px"
          : "-310px";
      }
    );
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="wrapper">
          <div id="sidebar" className="course-menu">
            <div className="logo"></div>
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
        <div id="sidebar" className="course-menu">
          <div className="logo"></div>
          <p className="logged-user">Welcome, {this.props.loggedName}</p>
          <span className="burger-wrap" onClick={this.slideSidebar}>
            {!this.state.sidebarHidden ? (
              <FontAwesomeIcon className="panel-icon" icon={faBars} />
            ) : (
              <FontAwesomeIcon className="panel-icon" icon={faTimesCircle} />
            )}
          </span>
          <button className="btn-schedule" onClick={this.onScheduleClick}>
            Your Week Schedule
          </button>
          <ul>{courses}</ul>
        </div>
      </div>
    );
  }
}
export default Sidebar;
