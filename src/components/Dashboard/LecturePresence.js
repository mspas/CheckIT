import React from "react";
import { Table } from "react-bootstrap";

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
      return <p>Loading ...</p>;
    }

    let students = this.props.students.map((data, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}.</td>
          <td>{data.name}</td>
          <td>{data.indeks}</td>
          <td>{data.email}</td>
          <td>{data.presences}</td>
          <td>{this.isPresent(data.indeks) && "Yes"}</td>
        </tr>
      );
    });

    return (
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Indeks</th>
            <th>Email</th>
            <th>No of presence</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>{students}</tbody>
      </Table>
    );
  }
}
export default LecturePresence;
