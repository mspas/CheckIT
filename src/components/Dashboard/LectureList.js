import React from "react";
import "../../styles/lecture.sass";
import { Link } from "react-scroll";
import { Spinner, Button } from "react-bootstrap";
import ApiService from "../../services/api.service";
import LecturePresence from "./LecturePresence";
import CourseOverview from "./CourseOverview";

class LectureList extends React.Component {
  constructor(props) {
    super(props);
    this._api = new ApiService();

    this.state = {
      url: "http://25.23.181.97:8090",
      overviewData: null,
      courseOverviewClicked: false,
      isLoadingOverview: true,
      presenceLoading: true,
    };
    this.onBackClick = this.onBackClick.bind(this);
    this.onLectureClick = this.onLectureClick.bind(this);
    this.onOverviewClick = this.onOverviewClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.courseId !== prevProps.courseId) {
      this.setState({
        courseOverviewClicked: false,
        isLoadingOverview: true,
      });
    }
  }

  onBackClick() {
    this.props.eraseLecture();
    this.setState({
      courseOverviewClicked: false,
      isLoadingOverview: true,
    });
  }

  onLectureClick(data, index, event) {
    this.props.changeLecture(data.id);

    fetch(this.state.url + "/api/lectures/" + data.id + "/details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          lectureIndex: index + 1,
          presenceData: json,
          presenceLoading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error database fetch data: lecture data");
      });
  }

  onOverviewClick() {
    fetch(
      this.state.url +
        "/api/courses/" +
        this.props.courseData.courseId +
        "/summary",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          overviewData: json,
          courseOverviewClicked: true,
          isLoadingOverview: false,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error database fetch data: lecture data");
      });
  }

  render() {
    if (!this.props.isLoading && !this.props.courseData) {
      return (
        <div className="noselect-wrap center">
          <span className="noselect-info">
            Select course from sidebar menu to see its details!
          </span>
        </div>
      );
    }

    if (this.props.isLoading) {
      return (
        <div className="spinner-wrap center">
          <Spinner animation="border" variant="primary" role="status"></Spinner>
        </div>
      );
    }

    let lectures = this.props.lectures.lectures.map((data, index) => {
      let dateT = new Date(data.date.replace(" at ", "T"));
      let dateS =
        "" +
        ("0" + dateT.getDate()).slice(-2) +
        "-" +
        ("0" + (dateT.getMonth() + 1)).slice(-2) +
        "-" +
        dateT.getFullYear() +
        " ";
      let hour =
        "" +
        ("0" + dateT.getHours()).slice(-2) +
        ":" +
        ("0" + dateT.getMinutes()).slice(-2);
      return (
        <Link
          className="lecture-elem"
          to=""
          key={index}
          onClick={this.onLectureClick.bind(null, data, index)}
        >
          <p>
            Lecture {index + 1} <span className="lecture-hour">{hour}</span>
            <span className="lecture-date">{dateS}</span>
          </p>
        </Link>
      );
    });

    return (
      <div>
        <div className="course-name slope slope3">
          {this.props.lectures.name}
        </div>
        <div className="course-code slope slope4">
          {this.props.courseData.courseCode}
        </div>
        <div className="lecture-list">
          {this.props.lectureId === -1 && !this.state.courseOverviewClicked && (
            <div>
              <Button variant="info" onClick={this.onOverviewClick.bind(null)}>
                Course overview
              </Button>
              {lectures}
            </div>
          )}
        </div>
        {this.props.lectureId !== -1 && (
          <div className="presence-wrap">
            <div className="btn-wrap">
              <Button variant="secondary" onClick={this.onBackClick}>
                Back
              </Button>
            </div>
            <LecturePresence
              courseName={this.props.lectures.name}
              courseData={this.props.courseData}
              lectureIndex={this.state.lectureIndex}
              presenceData={this.state.presenceData}
              isLoading={this.state.presenceLoading}
            />
          </div>
        )}
        {this.props.lectureId === -1 && this.state.courseOverviewClicked && (
          <div className="presence-wrap">
            <div className="btn-wrap">
              <Button variant="secondary" onClick={this.onBackClick}>
                Back
              </Button>
            </div>
            <CourseOverview
              courseName={this.props.lectures.name}
              courseData={this.props.courseData}
              overviewData={this.state.overviewData}
              isLoading={this.state.isLoadingOverview}
            />
          </div>
        )}
      </div>
    );
  }
}
export default LectureList;
