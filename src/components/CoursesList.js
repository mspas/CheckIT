import React from "react";
import "../styles/events-list.sass";
import CourseLink from "./CourseLink";

class CoursesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedCourseId: -1
    };
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleLinkClick(data, event) {
    this.setState({
      clickedCourseId: data.id
    });
  }

  render() {
    let courses = this.props.courses.map((data, index) => {
      return (
        <CourseLink
          onClick={this.handleLinkClick.bind(null, data)}
          course_id={data.id}
          name={data.name}
          key={index}
        />
      );
    });

    return (
      <ul className="events_list">
        {this.state.clickedCourseId == -1 && courses}
        {this.state.clickedCourseId !== -1 && courses}
      </ul>
    );
  }
}
export default CoursesList;
