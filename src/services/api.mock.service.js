//demo api mockup, each set of data simulates a response from the endpoint

const exampleToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE1ODkyOTI5OTksImV4cCI6bnVsbCwiYXVkIjoiIiwic3ViIjoiMTIzNDU2QHN0dWRlbnQucHdyLndyb2MucGwiLCJ1c2VySWQiOiI1IiwibmFtZSI6Ik1hcmNpbiBTcGFzacWEc2tpIiwicm9sZSI6IkxFQ1RVUkVSIn0.0Fqxiyv6YX5CalF_Fm3c70IBaVy7ZC5c5pfrdFtIzi4";

const exampleToken2 =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTExMTFAc3R1ZGVudC5wd3Iud3JvYy5wbCIsInVzZXJJZCI6IjEiLCJuYW1lIjoiS2FtaWwgQnJ6eWNraSIsInJvbGUiOiJTVFVERU5UIn0.U6iQ9viaBtKJ-SAZlyMe1xyqmkYEv1wCs_dfsvz8F2I";

const coursesDetails = {
  courseId: 1,
  courseCode: "E05-10b",
  lecturesAmount: 6,
  students: [
    {
      name: "Henryk de Valois",
      email: "200001@student.pwr.wroc.pl",
      indeks: 200001,
      presences: 0,
    },
    {
      name: "Istvan Bathory",
      email: "111111@student.pwr.wroc.pl",
      indeks: 111111,
      presences: 4,
    },
    {
      name: "Sigismund Vasa",
      email: "222222@student.pwr.wroc.pl",
      indeks: 222222,
      presences: 4,
    },
    {
      name: "Władysław Vasa",
      email: "333333@student.pwr.wroc.pl",
      indeks: 333333,
      presences: 3,
    },
    {
      name: "Jan Kazimierz Vasa",
      email: "444444@student.pwr.wroc.pl",
      indeks: 444444,
      presences: 2,
    },
    {
      name: "Michał Korybut Wiśniowiecki",
      email: "555555@student.pwr.wroc.pl",
      indeks: 555555,
      presences: 1,
    },
    {
      name: "Jan Sobieski",
      email: "666666@student.pwr.wroc.pl",
      indeks: 666666,
      presences: 5,
    },
  ],
};

const coursesSummary = {
  courseId: 1,
  courseCode: "E05-10b",
  students: [
    {
      student: {
        name: "Henryk de Valois",
        email: "200001@student.pwr.wroc.pl",
        indeks: 200001,
      },
      presences: [],
    },
    {
      student: {
        name: "Istvan Bathory",
        email: "111111@student.pwr.wroc.pl",
        indeks: 111111,
      },
      presences: [1, 2, 3, 6],
    },
    {
      student: {
        name: "Sigismund Vasa",
        email: "222222@student.pwr.wroc.pl",
        indeks: 222222,
      },
      presences: [2, 3, 4, 6],
    },
    {
      student: {
        name: "Władysław Vasa",
        email: "333333@student.pwr.wroc.pl",
        indeks: 333333,
      },
      presences: [1, 3, 5],
    },
    {
      student: {
        name: "Jan Kazimierz Vasa",
        email: "444444@student.pwr.wroc.pl",
        indeks: 444444,
      },
      presences: [1, 6],
    },
    {
      student: {
        name: "Michał Korybut Wiśniowiecki",
        email: "555555@student.pwr.wroc.pl",
        indeks: 555555,
      },
      presences: [1],
    },
    {
      student: {
        name: "Jan Sobieski",
        email: "666666@student.pwr.wroc.pl",
        indeks: 666666,
      },
      presences: [1, 2, 3, 4, 5],
    },
  ],
  lecturesAmount: 6,
};

const lecturersCourses = {
  lecturerId: 5,
  courses: [
    {
      id: 2,
      name: "Computer Project Management",
      lectures: [
        {
          id: 7,
          date: "2020-05-05 at 09:00:00",
        },
        {
          id: 8,
          date: "2020-05-06 at 09:00:00",
        },
        {
          id: 9,
          date: "2020-05-07 at 09:00:00",
        },
        {
          id: 10,
          date: "2020-05-08 at 09:00:00",
        },
        {
          id: 11,
          date: "2020-05-09 at 09:00:00",
        },
        {
          id: 12,
          date: "2020-05-10 at 09:00:00",
        },
      ],
    },
    {
      id: 6,
      name: "Elect. media in Busi.",
      lectures: [
        {
          id: 13,
          date: "2020-05-05 at 01:00:00",
        },
        {
          id: 14,
          date: "2020-05-06 at 01:00:00",
        },
        {
          id: 15,
          date: "2020-05-07 at 01:00:00",
        },
        {
          id: 16,
          date: "2020-05-08 at 01:00:00",
        },
        {
          id: 17,
          date: "2020-05-09 at 01:00:00",
        },
        {
          id: 18,
          date: "2020-05-10 at 01:00:00",
        },
        {
          id: 19,
          date: "2020-05-11 at 01:00:00",
        },
        {
          id: 20,
          date: "2020-05-12 at 01:00:00",
        },
      ],
    },
  ],
};

const lecturersSchedule = {
  lecturerId: 5,
  schedule: [
    {
      date: "2020-05-04",
      day: "MON",
      lectures: [
        {
          course: "Elect. media in Busi.",
          code: "E08-60a",
          lecturerName: "M. Spas",
          building: "C4",
          room: "s239",
          time: "19:00",
          duration: 120,
        },
      ],
    },
    {
      date: "2020-05-05",
      day: "TUE",
      lectures: [
        {
          course: "Computer Project Management",
          code: "E08-59a",
          lecturerName: "M. Spas",
          building: "C4",
          room: "s239",
          time: "09:00",
          duration: 105,
        },
        {
          course: "Elect. media in Busi.",
          code: "E08-60a",
          lecturerName: "M. Spas",
          building: "C4",
          room: "s239",
          time: "13:00",
          duration: 165,
        },
        {
          course: "Elect. media in Busi.",
          code: "E08-60a",
          lecturerName: "M. Spas",
          building: "C4",
          room: "s239",
          time: "16:00",
          duration: 105,
        },
      ],
    },
    {
      date: "2020-05-06",
      day: "WED",
      lectures: [
        {
          course: "Computer Project Management",
          code: "E08-59a",
          lecturerName: "M. Spas",
          building: "C4",
          room: "s239",
          time: "07:30",
          duration: 105,
        },
        {
          course: "Elect. media in Busi.",
          code: "E08-60a",
          lecturerName: "M. Spas",
          building: "C4",
          room: "s239",
          time: "13:00",
          duration: 165,
        },
      ],
    },
    {
      date: "2020-05-07",
      day: "THU",
      lectures: [
        {
          course: "Computer Project Management",
          code: "E08-59a",
          lecturerName: "M. Spas",
          building: "C4",
          room: "s239",
          time: "10:00",
          duration: 105,
        },
        {
          course: "Elect. media in Busi.",
          code: "E08-60a",
          lecturerName: "M. Spas",
          building: "C4",
          room: "s239",
          time: "12:30",
          duration: 165,
        },
      ],
    },
    {
      date: "2020-05-08",
      day: "FRI",
      lectures: [],
    },
    {
      date: "2020-05-09",
      day: "SAT",
      lectures: [
        {
          course: "Computer Project Management",
          code: "E08-59a",
          lecturerName: "M. Spas",
          building: "C4",
          room: "s239",
          time: "09:00",
          duration: 105,
        },
        {
          course: "Elect. media in Busi.",
          code: "E08-60a",
          lecturerName: "M. Spas",
          building: "C4",
          room: "s239",
          time: "11:00",
          duration: 155,
        },
      ],
    },
    {
      date: "2020-05-10",
      day: "SUN",
      lectures: [
        {
          course: "Computer Project Management",
          code: "E08-59a",
          lecturerName: "M. Spas",
          building: "C4",
          room: "s239",
          time: "16:15",
          duration: 105,
        },
        {
          course: "Elect. media in Busi.",
          code: "E08-60a",
          lecturerName: "M. Spas",
          building: "C4",
          room: "s239",
          time: "13:00",
          duration: 165,
        },
      ],
    },
  ],
};

const lecturesDetails = {
  lectureId: 1,
  date: "2020-05-04 at 12:00:00",
  building: "C4",
  room: "s239",
  lecturer: "Mirek Rajczyk",
  students: [
    {
      name: "Istvan Bathory",
      email: "111111@student.pwr.wroc.pl",
      indeks: 111111,
    },
    {
      name: "Władysław Vasa",
      email: "333333@student.pwr.wroc.pl",
      indeks: 333333,
    },
    {
      name: "Jan Kazimierz Vasa",
      email: "444444@student.pwr.wroc.pl",
      indeks: 444444,
    },
    {
      name: "Michał Korybut Wiśniowiecki",
      email: "555555@student.pwr.wroc.pl",
      indeks: 555555,
    },
    {
      name: "Jan Sobieski",
      email: "666666@student.pwr.wroc.pl",
      indeks: 666666,
    },
  ],
};

export default class ApiServiceMock {
  constructor() {
    this.getExampleToken = this.getExampleToken.bind(this);
    this.getCoursesDetails = this.getCoursesDetails.bind(this);
    this.getCoursesSummary = this.getCoursesSummary.bind(this);
    this.getLecturersCourses = this.getLecturersCourses.bind(this);
    this.getLecturersSchedule = this.getLecturersSchedule.bind(this);
    this.getLecturesDetails = this.getLecturesDetails.bind(this);
  }

  getExampleToken() {
    return exampleToken;
  }

  getCoursesDetails() {
    return Promise.resolve(coursesDetails);
  }

  getCoursesSummary() {
    return Promise.resolve(coursesSummary);
  }

  getLecturersCourses() {
    return Promise.resolve(lecturersCourses);
  }

  getLecturersSchedule() {
    return Promise.resolve(lecturersSchedule);
  }

  getLecturesDetails() {
    return Promise.resolve(lecturesDetails);
  }
}
