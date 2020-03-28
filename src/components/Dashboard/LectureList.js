import React from "react";
import "../../styles/lecture-list.sass";
import { Link } from "react-scroll";

class LectureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedCourseId: -1
    };
    console.log(JSON.stringify(this.props.lectures));
  }

  handleLinkClick(data, event) {
    this.setState({
      clickedCourseId: data.id
    });
  }

  render() {
    if (this.state.isLoading) {
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

    return <ul className="lecture-list">{lectures}</ul>;
  }
}
export default LectureList;
