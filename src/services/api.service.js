export default class ApiService {
  constructor(domain) {
    this.domain = "http://25.23.181.97:8090";
    this.getCoursesForLecturer = this.getCoursesForLecturer.bind(this);
    this.getCourseData = this.getCourseData.bind(this);
    this.getLectureData = this.getLectureData.bind(this);
  }

  getCoursesForLecturer(lecturer_id) {
    fetch(this.domain + "/api/lecturers/" + lecturer_id + "/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.error(json);
        return Promise.resolve(json);
      })
      .catch((err) => {
        console.error(err);
        alert("Error database fetch data: courses");
      });
  }

  getCourseData(course_id) {
    fetch(this.domain + "/api/courses/" + course_id + "/details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return Promise.resolve(res);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error database fetch data: course data");
      });
  }

  getLectureData(lecture_id) {
    fetch(this.domain + "/api/lectures/" + lecture_id + "/details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return Promise.resolve(res);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error database fetch data: lecture data");
      });
  }
}
