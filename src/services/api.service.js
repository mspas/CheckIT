import decode from "jwt-decode";

const courses = {
  array: [
    { id: 0, lecturer_id: 0, name: "Information System Modeling" },
    { id: 1, lecturer_id: 0, name: "Computer Project Management" },
    { id: 2, lecturer_id: 0, name: "Research skills and methodology" },
    { id: 3, lecturer_id: 0, name: "Telecommunication" },
    { id: 4, lecturer_id: 0, name: "System singals control" }
  ]
};

const lectures = {
  array: [
    {
      id: 0,
      course_id: 0,
      lecturer_id: 0,
      lectureHall_id: 0,
      date: "2020-04-22"
    },
    {
      id: 1,
      course_id: 0,
      lecturer_id: 0,
      lectureHall_id: 1,
      date: "2020-04-20"
    },
    {
      id: 2,
      course_id: 1,
      lecturer_id: 0,
      lectureHall_id: 0,
      date: "2020-05-12"
    },
    {
      id: 3,
      course_id: 2,
      lecturer_id: 0,
      lectureHall_id: 1,
      date: "2020-06-07"
    },
    {
      id: 4,
      course_id: 4,
      lecturer_id: 0,
      lectureHall_id: 0,
      date: "2020-05-22"
    },
    {
      id: 5,
      course_id: 4,
      lecturer_id: 0,
      lectureHall_id: 1,
      date: "2020-04-30"
    }
  ]
};

const lecture_halls = {
  array: [
    { id: 0, room_number: 210, building: 2 },
    { id: 1, room_number: 420, building: 3 }
  ]
};

const users = {
  array: [
    { id: 0, email: "kazio@gmail.com", name: "Kazimierz", surname: "Wielki" },
    { id: 1, email: "bolek@gmail.com", name: "Bolesław", surname: "Chrobry" },
    { id: 2, email: "stefek@gmail.com", name: "Stefan", surname: "Batory" },
    { id: 3, email: "janek@gmail.com", name: "Jan", surname: "Sobieski" },
    {
      id: 4,
      email: "jogaila@gmail.com",
      name: "Władysław",
      surname: "Jagiellon"
    }
  ]
};

const presence = {
  array: [
    { id: 0, user_id: 0, lecture_id: 0 },
    { id: 1, user_id: 0, lecture_id: 1 },
    { id: 2, user_id: 0, lecture_id: 3 },
    { id: 3, user_id: 1, lecture_id: 1 },
    { id: 4, user_id: 2, lecture_id: 2 },
    { id: 5, user_id: 2, lecture_id: 5 },
    { id: 6, user_id: 3, lecture_id: 4 },
    { id: 7, user_id: 3, lecture_id: 2 },
    { id: 8, user_id: 4, lecture_id: 1 }
  ]
};

export default class ApiService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || "http://localhost:8080"; // API server domain
    this.getCourses = this.getCourses.bind(this);
  }

  getCourses(lecturer_id) {
    let res = [];
    courses.array.forEach(element => {
      if (element.lecturer_id === lecturer_id) res.push(element);
    });
    return Promise.resolve(res);
  }

  getLectures(course_id) {
    let res = [];
    lectures.array.forEach(element => {
      if (element.course_id === course_id) res.push(element);
    });
    return Promise.resolve(res);
  }

  getUser(user_id) {
    users.array.forEach(element => {
      if (element.user_id === user_id) return element;
    });
  }

  getPresence(lecture_id) {
    let res = [];
    presence.array.forEach(element => {
      if (element.lecture_id === lecture_id) res.push(element);
    });
    return Promise.resolve(res);
  }

  getLectureHalls(lecturehall_id) {
    return lecture_halls.array.forEach(element => {
      if (element.lecturehall_id === lecturehall_id) return element;
    });
  }
}
