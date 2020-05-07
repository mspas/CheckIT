import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Table, Spinner, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../../styles/lecture-presence.sass";

class CourseOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyLectures: [],
    };
    this.handleExportToPDF = this.handleExportToPDF.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    let temp = [];
    for (let i = 0; i < props.overviewData.lecturesAmount; i++) {
      temp.push(i + 1);
    }
    return {
      dummyLectures: temp,
    };
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
          ") - Presence Overview.pdf"
      );
    });
  }

  isPresent(lectureId, studentPresences) {
    for (let i = 0; i < studentPresences.length; i++) {
      if (studentPresences[i] === lectureId) return true;
    }
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

    let students = this.props.overviewData.students.map((data, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}.</td>
          <td>{data.student.name}</td>
          <td className="text-center">{data.student.indeks}</td>
          {this.state.dummyLectures.map((lect, i) => {
            return (
              <td className="text-center" key={i}>
                {this.isPresent(lect, data.presences) ? "Yes" : " "}
              </td>
            );
          })}
          <td className="text-center">{data.presences.length}</td>
        </tr>
      );
    });

    let headers = this.state.dummyLectures.map((data, index) => {
      return <th key={index}>{"Lecture " + data}</th>;
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
              {headers}
              <th>Presence in total</th>
            </tr>
          </thead>
          <tbody>{students}</tbody>
        </Table>
      </div>
    );
  }
}
export default CourseOverview;
