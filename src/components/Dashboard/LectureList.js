import React from "react";
import "../../styles/lecture.sass";
import { Link } from "react-scroll";
import { Spinner, Button } from "react-bootstrap";
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
      clickedLectureId: this.props.clickedLectureId,
      wasClicked: true,
      lectureData: null,
    };
    //this.handleLectureClick = this.handleLectureClick.bind(this);
    //this.handleBackClick = this.handleBackClick.bind(this);
    this.handleExportToExcel = this.handleExportToExcel.bind(this);
    this.handleExportToPDF = this.handleExportToPDF.bind(this);
  }

  /*handleLectureClick(data, event) {
    fetch(this.state.url + "/api/lectures/" + data.id + "/details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState(
          {
            clickedLectureId: data.id,
            lectureData: json,
            isLoading: false,
          },
          () => {
            console.log(this.state.clickedLectureId);
          }
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Error database fetch data: lecture data");
      });
  }*/

  handleExportToExcel() {}
  handleExportToPDF() {}

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
          onClick={this.props.onLectureClick.bind(null, data)}
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
          {this.props.clickedLectureId === -1 && lectures}
        </div>
        {this.props.clickedLectureId !== -1 && (
          <div className="presence-wrap">
            <div className="buttons-wrap">
              <Button variant="secondary" onClick={this.props.onBackClick}>
                Back
              </Button>
              <Button variant="info" onClick={this.handleExportToExcel}>
                Export to Excel
              </Button>
              <Button variant="info" onClick={this.handleExportToPDF}>
                Export to PDF
              </Button>
            </div>
            <LecturePresence
              lectureData={this.props.lectureData}
              students={this.props.courseData.students}
              isLoading={this.props.presenceLoading}
            />
          </div>
        )}
      </div>
    );
  }
}
export default LectureList;
