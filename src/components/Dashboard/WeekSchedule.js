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
      hoursOfTheDayList: hours,
    };
  }

  componentDidUpdate() {
    if (this.props.scheduleData !== null) {
      let i = 0;
      this.props.scheduleData.schedule.forEach((day) => {
        day.lectures.forEach((lecture) => {
          let lectureDateTemp = new Date(dummyDay + lecture.time);
          let startMinutes = lectureDateTemp.getMinutes();

          let blockId = `lectureD${i}H${lectureDateTemp.getHours()}`;
          let block = document.getElementById(blockId);

          this.styleLectureBlock(block, startMinutes, lecture.duration);

          let endHour = this.getLectureEndHour(
            lectureDateTemp.getHours(),
            lectureDateTemp.getMinutes(),
            lecture.duration
          );

          block.innerHTML =
            `<p>${lecture.course.slice(0, 20)}...</p>` +
            `<p>${lecture.building} ${lecture.room}</p>` +
            `<p>${lecture.time}-${endHour}</p>`;
        });
        i++;
      });
    }
  }

  styleLectureBlock(blockElem, startMinutes, duration) {
    if (!blockElem) return;
    let blockHeight = (100 * duration) / 60;
    let startMinutesDiff = (100 * startMinutes) / 60;

    blockElem.style.top = startMinutes > 0 ? `${startMinutesDiff}%` : "0";
    blockElem.style.height = `${blockHeight}%`;
    blockElem.style.background =
      colors[Math.floor(Math.random() * colors.length)];
  }

  getLectureEndHour(startHour, startMinutes, duration) {
    let endHourValue = (startHour * 60 + startMinutes + duration) / 60;

    let minutes = (endHourValue - Math.floor(endHourValue)) * 60;
    let minutesString = ("0" + Math.ceil(minutes)).slice(-2);

    return `${Math.floor(endHourValue)}:${minutesString}`;
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

    let hoursList = this.state.hoursOfTheDayList.map((hour, i) => {
      let hourString =
        ("0" + hour.getHours()).slice(-2) +
        ":" +
        ("0" + hour.getMinutes()).slice(-2);
      return (
        <tr key={i}>
          <td className="hour">{hourString}</td>
          {this.props.scheduleData.schedule.map((data, index) => {
            return (
              <td key={index}>
                {this.isLecture(data.lectures, hour) && (
                  <div
                    id={`lectureD${index}H${hour.getHours()}`}
                    className="lecture-block"
                  ></div>
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
