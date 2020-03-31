import React from "react";
import "../../../../styles/course.sass";
import { Link } from "react-scroll";
import ApiService from "../../../../services/api.service";
import LecturePresence from "./LecturePresence";

class LectureList extends React.Component {
  constructor(props) {
    super(props);
    this._api = new ApiService();

    this.state = {
      isLoadingUsers: true,
      isLoadingPresence: true,
      clickedLectureId: -1,
      users: [],
      presence: []
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
      this.setState({ presence: res, isLoadingPresence: false });
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
          className="list-elem"
          to=""
          key={index}
          onClick={this.handleLinkClick.bind(null, data)}
        >
          <span className="course-name">{data.date}</span>
        </Link>
      );
    });

    return (
      <div>
        <ul className="list">
          {this.state.clickedLectureId === -1 && lectures}
        </ul>
        {this.state.clickedLectureId !== -1 && (
          <div>
            <Link to="" onClick={this.handleBackClick}>
              -back-
            </Link>
            <LecturePresence
              presence={this.state.presence}
              users={this.state.users}
              isLoadingUsers={this.state.isLoadingUsers}
              isLoadingPresence={this.state.isLoadingPresence}
            />
          </div>
        )}
      </div>
    );
  }
}
export default LectureList;
