export const changeCourse = (id) => {
  return {
    type: "CHANGE_COURSE",
    payload: id,
  };
};

export const eraseCourse = () => {
  return {
    type: "ERASE_COURSE",
  };
};

export const changeLecture = (id) => {
  return {
    type: "CHANGE_LECTURE",
    payload: id,
  };
};

export const eraseLecture = () => {
  return {
    type: "ERASE_LECTURE",
  };
};
