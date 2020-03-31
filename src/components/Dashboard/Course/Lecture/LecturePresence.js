import React from "react";
import { Table } from "react-bootstrap";

class LecturePresence extends React.Component {
  isPresent(user_id) {
    for (let i = 0; i < this.props.presence.length; i++) {
      const element = this.props.presence[i];
      if (element.user_id === user_id) {
        return true;
      }
    }
    return false;
  }

  render() {
    if (this.props.isLoadingUsers || this.props.isLoadingPresence) {
      return <p>Loading ...</p>;
    }

    let students = this.props.users.map((data, index) => {
      return (
        <tr key={index}>
          <td>{index}.</td>
          <td>{data.name}</td>
          <td>{data.surname}</td>
          <td>{this.isPresent(data.id) && "Yes"}</td>
        </tr>
      );
    });

    return (
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>{students}</tbody>
      </Table>
    );
  }
}
export default LecturePresence;
