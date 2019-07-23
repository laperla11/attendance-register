import React, { Component } from "react";
import StudentsList from "./StudentsList";
import StudentsAbsents from "./StudentsAbsents";
import FakeUsers from "../../fakeData.json";
import "./index.css";

class MentorHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: ""
    };
  }

  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/users")
    fetch("api/attendance")
      .then(data => data.json())
      .then(data => this.setState({ students: data }));
  }

  render() {
    // const { students } = this.state;
    const {
      name,
      session,
      date,
      attendingStudents,
      totalAttendingStudents,
      absentStudents,
      totalAbsentStudents,
      proportion
    } = this.state.students;
    {
      console.log(
        attendingStudents,
        totalAttendingStudents,
        absentStudents,
        totalAbsentStudents,
        proportion
      );
    }
    return (
      <main className="main">
        <h1>Attendance Register</h1>
        <br />
        <p>
          {name} / {session}
        </p>
        <p>{date}</p>
        <section className="studentsList">
          <h2>Students in Class</h2>
          <StudentsList
            // students={FakeUsers}
            students={attendingStudents}
            total={totalAttendingStudents}
          />
        </section>
        <section className="studentsList">
          <h2>Students Absents</h2>
          <StudentsAbsents
            // students={FakeUsers}
            students={absentStudents}
            total={totalAbsentStudents}
          />
        </section>
        <br />
        <p>Proportion : % {proportion}</p>
      </main>
    );
  }
}

export default MentorHome;
