import { connect } from "react-redux";
import {
  changeCourse,
  eraseCourse,
  changeLecture,
  eraseLecture,
} from "../../actions";
import Sidebar from "./Sidebar";

const mapDispatchToProps = {
  changeCourse,
  eraseCourse,
  changeLecture,
  eraseLecture,
};

const mapStateToProps = (state) => {
  return {
    courseId: state.courseId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
