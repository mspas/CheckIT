import React from "react";
import "../../../../styles/lecture-list.sass";
import { Link } from "react-scroll";
import ApiService from "../../../../services/api.service";
import LecturePressence from "./LecturePressence";

class LectureList extends React.Component {
  constructor(props) {
    super(props);
    this._api = new ApiService();

    this.state = {
      isLoadingUsers: true,
      isLoadingPressence: true,
      clickedLectureId: -1,
      users: [],
      pressence: []
    };
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleLinkClick(data, event) {
    this.setState({
      clickedLectureId: data.id
    });

    this._api.getUsersForLecture().then(res => {
      this.setState({ users: res, isLoadingUsers: false });
    });
    this._api.getPresence(data.id).then(res => {
      this.setState({ pressence: res, isLoadingPressence: false });
    });
  }

  handleBackClick() {
    this.setState({
      clickedLectureId: -1
    });
  }

  render() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>;
    }

    let lectures = this.props.lectures.map((data, index) => {
      return (
        <Link
          className="lecture-elem"
          to=""
          key={index}
          onClick={this.handleLinkClick.bind(null, data)}
        >
          {data.date}
        </Link>
      );
    });

    return (
      <div>
        <ul className="lecture-list">
          {this.state.clickedLectureId === -1 && lectures}
        </ul>
        {this.state.clickedLectureId !== -1 && (
          <div>
            <Link className="lecture-elem" to="" onClick={this.handleBackClick}>
              -back-
            </Link>
            <LecturePressence
              pressence={this.state.pressence}
              users={this.state.users}
              isLoadingUsers={this.state.isLoadingUsers}
              isLoadingPressence={this.state.isLoadingPressence}
            />
          </div>
        )}
      </div>
    );
  }
}
export default LectureList;
