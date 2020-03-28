import React from "react";
import "../styles/dashboard.sass";

class CourseLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div data-name={this.props.name} onClick={this.props.onClick}>
        {this.props.name}
      </div>
    );
  }
}
export default CourseLink;
