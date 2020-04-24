import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Table, Spinner, Button } from "react-bootstrap";
import "../../styles/lecture-presence.sass";

class CourseOverview extends React.Component {
  isPresent(lectureId, studentNumber) {
    this.props.overviewData.forEach((lecture) => {
      if (lecture.id === lectureId) {
        lecture.students.forEach((student) => {
          if (student.indeks === studentNumber) {
            return true;
          }
        });
      }
    });
    return false;
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="spinner-wrap center">
          <Spinner animation="border" variant="primary" role="status"></Spinner>
        </div>
      );
    }

    let students = this.props.students.map((data, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}.</td>
          <td>{data.name}</td>
          <td className="text-center">{data.indeks}</td>
          <td>{data.email}</td>
          {this.props.overviewData.map((lect, i) => {
            return (
              <td className="text-center" key={i}>
                {this.isPresent(lect.id, data.indeks) && "Y"}
              </td>
            );
          })}
          <td className="text-center">{data.presences}</td>
        </tr>
      );
    });

    let headers = this.props.overviewData.map((data, index) => {
      return <th key={index}>{"Lecture " + (index + 1)}</th>;
    });

    return (
      <div className="presence-list-wrap">
        <div className="buttons-wrap">
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="button btn"
            table="table-to-export"
            filename={
              this.props.courseName +
              "(" +
              this.props.courseData.courseCode +
              ") - Presence Overview"
            }
            sheet="tablexls"
            buttonText="Export to XLS"
          />
          <Button
            className="button"
            variant="info"
            onClick={this.handleExportToPDF}
          >
            Export to PDF
          </Button>
        </div>
        <Table responsive bordered hover id="table-to-export">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Student's number</th>
              <th>Email</th>
              {headers}
              <th>Number of presences</th>
            </tr>
          </thead>
          <tbody>{students}</tbody>
        </Table>
      </div>
    );
  }
}
export default CourseOverview;
