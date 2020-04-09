import React from "react";
import "../../styles/course.sass";
import { Link } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class CoursesSidebar extends React.Component {
  render() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>;
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
          <p>logo</p>
          <span>
            <FontAwesomeIcon className="panel-icon" icon={faBars} />
          </span>
          <ul>{courses}</ul>
        </div>
      </div>
    );
  }
}
export default CoursesSidebar;
