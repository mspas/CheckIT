import React from "react";
import "../../styles/course-list.sass";
import { Link } from "react-scroll";
import LectureList from "./LectureList";
import ApiService from "../../services/api.service";

class CoursesList extends React.Component {
  constructor(props) {
    super(props);
    this._api = new ApiService();

    let lecturer_id = 0;

    this.state = {
      clickedCourseId: -1,
      isLoading: true,
      selectedLectures: []
    };
    this._api.getLectures(lecturer_id).then(res => {
      this.setState({ courses: res, isLoading: false });
    });

    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleLinkClick(data, event) {
    this.setState({
      clickedCourseId: data.id
    });

    this._api.getLectures(data.id).then(res => {
      this.setState({ selectedLectures: res, isLoading: false });
    });
  }

  handleBackClick() {
    this.setState({
      clickedCourseId: -1
    });
  }

  render() {
    let courses = this.props.courses.map((data, index) => {
      return (
        <Link
          className="course-elem"
          to=""
          key={index}
          onClick={this.handleLinkClick.bind(null, data)}
        >
          {data.name}
        </Link>
      );
    });

    return (
      <div>
        <ul className="course-list">
          {this.state.clickedCourseId === -1 && courses}
        </ul>
        {this.state.clickedCourseId !== -1 && (
          <div>
            <Link className="course-elem" to="" onClick={this.handleBackClick}>
              -back-
            </Link>
            <LectureList
              lectures={this.state.selectedLectures}
              isLoading={this.state.isLoading}
            />
          </div>
        )}
      </div>
    );
  }
}
export default CoursesList;
