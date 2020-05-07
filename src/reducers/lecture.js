const lectureReducer = (state = -1, action) => {
  switch (action.type) {
    case "CHANGE_LECTURE":
      return action.payload;
    case "ERASE_LECTURE":
      return -1;
    default:
      return state;
  }
};
export default lectureReducer;
