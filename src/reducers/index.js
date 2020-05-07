import courseReducer from "./course";
import lectureReducer from "./lecture";
import loggedReducer from "./isLogged";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  courseId: courseReducer,
  lectureId: lectureReducer,
  islogged: loggedReducer,
});
export default rootReducer;
