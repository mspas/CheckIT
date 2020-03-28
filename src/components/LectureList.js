import React from "react";
import "../styles/events-list.sass";
import CourseLink from "./CourseLink";

class LectureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedCourseId: -1
    };
  }

  handleLinkClick(data, event) {
    this.setState({
      clickedCourseId: data.id
    });
  }

  render() {
    let events = this.props.courses.map((data, index) => {
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
        {this.state.clickedCourseId == -1 && events}
        {this.state.clickedCourseId == -1 && events}
      </ul>
    );
  }
}
export default LectureList;
