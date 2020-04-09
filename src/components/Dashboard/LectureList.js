import React from "react";
import "../../styles/lecture.sass";
import { Link } from "react-scroll";
import ApiService from "../../services/api.service";
import LecturePresence from "./LecturePresence";

class LectureList extends React.Component {
  constructor(props) {
    super(props);
    this._api = new ApiService();

    this.state = {
      url: "http://25.23.181.97:8090",
      isLoadingUsers: true,
      isLoading: true,
      clickedLectureId: -1,
      lectureData: null,
    };
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleLinkClick(data, event) {
    this.setState({
      clickedLectureId: data.id,
    });

    fetch(this.state.url + "/api/lectures/" + "1" + "/details", {
      /////////// HARDCODE !!!!!!!!!!!!!!!
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ lectureData: json, isLoading: false });
      })
      .catch((err) => {
        console.error(err);
        alert("Error database fetch data: lecture data");
      });

    /*this._api.getLectureData(data.id).then((res) => {
      this.setState({ lectureData: res, isLoading: false });
    });*/
  }

  handleBackClick() {
    this.setState({
      clickedLectureId: -1,
    });
  }

  render() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>;
    }

    let lectures = this.props.lectures.map((data, index) => {
      return (
        <Link
          className="list-elem"
          to=""
          key={index}
          onClick={this.handleLinkClick.bind(null, data)}
        >
          <span className="course-name">{data.date}</span>
        </Link>
      );
    });

    return (
      <div>
        <p>{this.props.courseData.courseCode}</p>
        <div className="list">
          {this.state.clickedLectureId === -1 && lectures}
        </div>
        {this.state.clickedLectureId !== -1 && (
          <div>
            <Link to="" onClick={this.handleBackClick}>
              -back-
            </Link>
            <LecturePresence
              lectureData={this.state.lectureData}
              students={this.props.courseData.students}
              isLoading={this.state.isLoading}
            />
          </div>
        )}
      </div>
    );
  }
}
export default LectureList;
