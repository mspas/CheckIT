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
      isLoadingUsers: true,
      isLoadingOverview: true,
      isLoading: true,
      clickedLectureId: this.props.clickedLectureId,
      courseOverviewClicked: false,
      wasClicked: true,
      overviewData: null,
    };
    this.handlePressenceOverview = this.handlePressenceOverview.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
  }

  handlePressenceOverview() {
    var counter = 0;
    var overviewData = [];
    this.props.lectures.lectures.forEach((lecture) => {
      fetch(this.state.url + "/api/lectures/" + lecture.id + "/details", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          overviewData.push(json);
          counter++;
          if (counter === this.props.lectures.lectures.length) {
            this.setState({
              overviewData: overviewData,
              courseOverviewClicked: true,
              isLoadingOverview: false,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Error database fetch data: lecture data");
        });
    });
  }

  onBackClick() {
    this.setState({
      courseOverviewClicked: false,
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
          onClick={this.props.onLectureClick.bind(null, data, index)}
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
          {this.props.clickedLectureId === -1 &&
            !this.props.courseOverviewClicked && (
              <div>
                <Button
                  variant="info"
                  onClick={this.props.onOverviewClick.bind(null)}
                >
                  Course overview
                </Button>
                {lectures}
              </div>
            )}
        </div>
        {this.props.clickedLectureId !== -1 && (
          <div className="presence-wrap">
            <div className="btn-wrap">
              <Button variant="secondary" onClick={this.props.onBackClick}>
                Back
              </Button>
            </div>
            <LecturePresence
              courseName={this.props.lectures.name}
              courseData={this.props.courseData}
              lextureIndex={this.props.lextureIndex}
              lectureData={this.props.lectureData}
              students={this.props.courseData.students}
              isLoading={this.props.presenceLoading}
            />
          </div>
        )}
        {this.props.clickedLectureId === -1 &&
          this.props.courseOverviewClicked && (
            <div className="presence-wrap">
              <div className="btn-wrap">
                <Button variant="secondary" onClick={this.props.onBackClick}>
                  Back
                </Button>
              </div>
              <CourseOverview
                courseName={this.props.lectures.name}
                courseData={this.props.courseData}
                overviewData={this.props.overviewData}
                students={this.props.courseData.students}
                isLoading={this.props.isLoadingOverview}
              />
            </div>
          )}
      </div>
    );
  }
}
export default LectureList;
