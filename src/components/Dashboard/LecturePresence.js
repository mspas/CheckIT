import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Table, Spinner, Button } from "react-bootstrap";
import { Link } from "react-scroll";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../../styles/lecture-presence.sass";
import AuthService from "../../services/auth.service";

class LecturePresence extends React.Component {
  constructor(props) {
    super(props);
    this._auth = new AuthService();

    this.state = {
      url: "http://25.23.181.97:8090",
    };

    this.handleExportToPDF = this.handleExportToPDF.bind(this);
    this.onMarkPresenceClick = this.onMarkPresenceClick.bind(this);
  }

  isPresent(indeks) {
    for (let i = 0; i < this.props.presenceData.students.length; i++) {
      const element = this.props.presenceData.students[i];
      if (element.indeks === indeks) {
        return true;
      }
    }
    return false;
  }

  handleExportToPDF() {
    const input = document.getElementById("table-to-export");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape" });
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save(
        this.props.courseName +
          "(" +
          this.props.courseData.courseCode +
          ") - Lecture" +
          this.props.lectureIndex +
          ".pdf"
      );
    });
  }

  onMarkPresenceClick(data, index) {
    let lectureId = this.props.presenceData.lectureId;
    let studentId = data.id;
    console.log(lectureId, studentId);
    this._auth
      .fetch(this.state.url + "/api/lectures/presence", {
        method: "POST",
        body: JSON.stringify({
          lectureId,
          studentId,
        }),
      })
      .then((res) => {
        alert(data.name + " was marked as present");
      });
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="spinner-wrap center">
          <Spinner animation="border" variant="primary" role="status"></Spinner>
        </div>
      );
    }

    let students = this.props.courseData.students.map((data, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}.</td>
          <td>{data.name}</td>
          <td className="text-center">{data.indeks}</td>
          <td>{data.email}</td>
          <td className="text-center">
            {this.isPresent(data.indeks) ? "Yes" : " "}
          </td>
          <td className="text-center">{data.presences}</td>
          <td className="mark-presence">
            {!this.isPresent(data.indeks) ? (
              <Link
                className="btn-mark-presence"
                to=""
                onClick={this.onMarkPresenceClick.bind(null, data, index)}
              >
                <span>Present</span>
              </Link>
            ) : (
              " "
            )}
          </td>
        </tr>
      );
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
              ") - Lecture" +
              this.props.lectureIndex
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
              <th>Present</th>
              <th>Presence in total</th>
              <th>Mark presence</th>
            </tr>
          </thead>
          <tbody>{students}</tbody>
        </Table>
      </div>
    );
  }
}
export default LecturePresence;
