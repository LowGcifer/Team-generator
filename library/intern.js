const Employee = require("./Employee.js");

class Intern extends Employee {
  constructor(name, id, email, university) {
    super(name, id, email);
    this.university = university;
  }
  getSchool() {
    return this.school;
  }
  getRole() {
    return "Intern";
  }
}

module.exports = Intern;
