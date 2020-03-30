const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export default class DataService {
  constructor() {
    this.getMonthName = this.getMonthName.bind(this);
    this.getDayName = this.getDayName.bind(this);
  }

  getMonthName(index) {
    return monthNames[index];
  }

  getDayName(index) {
    return dayNames[index];
  }
}
