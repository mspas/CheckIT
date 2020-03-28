import React from "react";
import "../../styles/dashboard.sass";
import CoursesList from "./CoursesList";
import ApiService from "../../services/api.service";

class DashboardContent extends React.Component {
  constructor() {
    super();
    this._api = new ApiService();

    let lecturer_id = 0;

    this.state = {
      isLoading: true,
      courses: []
    };
    this._api.getCourses(lecturer_id).then(res => {
      this.setState({ courses: res, isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="main-content">
        {this.props.linksData[0].active && (
          <CoursesList courses={this.state.courses} />
        )}
        {this.props.linksData[1].active && (
          <CoursesList courses={this.state.courses} />
        )}
        {this.props.linksData[2].active && (
          <CoursesList courses={this.state.courses} />
        )}
      </div>
    );
  }
}
export default DashboardContent;
