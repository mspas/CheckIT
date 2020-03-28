import React from "react";
import "../styles/dashboard.sass";
import CoursesList from "./CoursesList";

class DashboardContent extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="main-content">
        {this.props.linksData[0].active && (
          <CoursesList
            history={this.props.history}
            courses={this.props.courses}
          />
        )}
        {this.props.linksData[1].active && (
          <CoursesList
            history={this.props.history}
            courses={this.props.courses}
          />
        )}
        {this.props.linksData[2].active && (
          <CoursesList
            history={this.props.history}
            courses={this.props.courses}
          />
        )}
      </div>
    );
  }
}
export default DashboardContent;
