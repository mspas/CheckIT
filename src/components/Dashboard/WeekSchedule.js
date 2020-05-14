import React from "react";
import { Spinner, Table } from "react-bootstrap";
import "../../styles/schedule.sass";

const dummyDay = "2000-01-01T";
const colors = ["#f2fac2", "#c4fada", "#fde0ed", "#b0c0c0", "#cbf0f0"];

class WeekSchedule extends React.Component {
  constructor(props) {
    super(props);
    let hours = [];

    for (let i = 7; i < 22; i++) {
      let hour = ("0" + i).slice(-2) + ":00";
      hours.push(new Date(dummyDay + hour));
    }
    this.state = {
      hoursD: hours,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.scheduleData !== null) {
      let i = 0;
      this.props.scheduleData.schedule.forEach((day) => {
        day.lectures.forEach((lect) => {
          let tempDate = new Date(dummyDay + lect.time);

          let blockId = "lectureD" + i + "H" + tempDate.getHours();
          let block = document.getElementById(blockId);

          let value = (100 * lect.duration) / 60;
          let startMinutesDiff = (100 * tempDate.getMinutes()) / 60;

          block.style.top =
            tempDate.getMinutes() > 0 ? startMinutesDiff + "%" : "0";
          block.style.height = "" + value + "%";
          block.style.background =
            colors[Math.floor(Math.random() * colors.length)];

          let endHourTemp =
            (tempDate.getHours() * 60 + tempDate.getMinutes() + lect.duration) /
            60;

          let minutes = (endHourTemp - Math.floor(endHourTemp)) * 60;

          let endHour =
            "" +
            Math.floor(endHourTemp) +
            ":" +
            ("0" + Math.ceil(minutes)).slice(-2);

          block.innerHTML =
            "<p>" +
            lect.course.slice(0, 20) +
            "..." +
            "</p><p>" +
            lect.building +
            " " +
            lect.room +
            "</p><p>" +
            lect.time +
            "-" +
            endHour +
            "</p>";
        });
        i++;
      });
    }
  }

  isLecture(lectures, hour) {
    for (let i = 0; i < lectures.length; i++) {
      let lecHour = new Date(dummyDay + lectures[i].time).getHours();
      if (hour.getHours() === lecHour) return true;
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

    let days = this.props.scheduleData.schedule.map((data, index) => {
      return <th key={index}>{data.day}</th>;
    });

    let hoursList = this.state.hoursD.map((hour, i) => {
      let hourS =
        "" +
        ("0" + hour.getHours()).slice(-2) +
        ":" +
        ("0" + hour.getMinutes()).slice(-2);
      return (
        <tr key={i}>
          <td className="hour">{hourS}</td>
          {this.props.scheduleData.schedule.map((data, index) => {
            return (
              <td key={index}>
                {this.isLecture(data.lectures, hour) ? (
                  <div
                    id={"lectureD" + index + "H" + hour.getHours()}
                    className="lecture-block"
                  ></div>
                ) : (
                  " "
                )}
              </td>
            );
          })}
        </tr>
      );
    });

    return (
      <div className="schedule-wrap">
        <Table responsive bordered>
          <thead>
            <tr>
              <th className="hour">Hour</th>
              {days}
            </tr>
          </thead>
          <tbody>{hoursList}</tbody>
        </Table>
      </div>
    );
  }
}
export default WeekSchedule;
