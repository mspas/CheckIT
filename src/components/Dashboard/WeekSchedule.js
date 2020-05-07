import React from "react";
import { Spinner } from "react-bootstrap";
import "../../styles/schedule.sass";

class WeekSchedule extends React.Component {
  render() {
    if (this.props.isLoading) {
      return (
        <div className="spinner-wrap center">
          <Spinner animation="border" variant="primary" role="status"></Spinner>
        </div>
      );
    }

    return <div className="schedule-wrap">siemano</div>;
  }
}
export default WeekSchedule;
