import { connect } from "react-redux";
import withAuth from "../../services/auth-guard.service";
import {
  changeCourse,
  eraseCourse,
  changeLecture,
  eraseLecture,
} from "../../actions";
import Dashboard from "./Dashboard";

const mapDispatchToProps = {
  changeCourse,
  eraseCourse,
  changeLecture,
  eraseLecture,
};

const mapStateToProps = (state) => {
  return {
    courseId: state.courseId,
    lectureId: state.lectureId,
  };
};

export default withAuth(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
