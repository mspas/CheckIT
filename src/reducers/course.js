const courseReducer = (state = -1, action) => {
  switch (action.type) {
    case "CHANGE_COURSE":
      return action.payload;
    case "ERASE_COURSE":
      return -1;
    default:
      return state;
  }
};
export default courseReducer;
