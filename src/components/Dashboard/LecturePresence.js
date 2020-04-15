import React from "react";
import { Table, Spinner } from "react-bootstrap";
import "../../styles/lecture-presence.sass";

class LecturePresence extends React.Component {
  isPresent(indeks) {
    for (let i = 0; i < this.props.lectureData.students.length; i++) {
      const element = this.props.lectureData.students[i];
      if (element.indeks === indeks) {
        return true;
      }
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

    let students = this.props.students.map((data, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}.</td>
          <td>{data.name}</td>
          <td className="text-center">{data.indeks}</td>
          <td>{data.email}</td>
          <td className="text-center">{data.presences}</td>
          <td className="text-center">
            {this.isPresent(data.indeks) && "Yes"}
          </td>
        </tr>
      );
    });

    return (
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Student's number</th>
            <th>Email</th>
            <th>Number of presences</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>{students}</tbody>
      </Table>
    );
  }
}
export default LecturePresence;
