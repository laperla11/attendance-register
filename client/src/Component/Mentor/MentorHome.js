import React, { Component } from "react";
import StudentsList from "./StudentsList";
import StudentsAbsents from "./StudentsAbsents";
import FakeUsers from "../../fakeData.json";
import "./Mentor.css";
import dayjs from "dayjs";

class MentorHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: "",
      selectedSession: "today"
    };
  }

  componentWillMount() {
    this.setState({ selectedSession: "today" }, () => this.fetchData());
  }

  fetchData = () => {
    fetch(`api/attendance?date=${this.state.selectedSession}`)
      // fetch("https://jsonplaceholder.typicode.com/users")
      // fetch("api/attendance")
      .then(data => data.json())
      .then(data => this.setState({ students: data }));
  };
  selectSession = e => {
    this.setState({ selectedSession: e.target.value }, () =>
      setInterval(this.fetchData, 1000)
    );
  };

  render() {
    const {
      sessions,
      name,
      session,
      date,
      attendingStudents,
      totalAttendingStudents,
      absentStudents,
      totalAbsentStudents,
      proportion
    } = this.state.students;
    const today = dayjs().format("DD/MM/YYYY");
    {
      console.log(
        sessions,
        name,
        session,
        date,
        attendingStudents,
        totalAttendingStudents,
        absentStudents,
        totalAbsentStudents,
        proportion
      );
      console.log("selected", this.state.selectedSession);
    }
    return (
      <main className="main">
        <h1>Attendance Register</h1>
        <br />
        <p>Today : {today}</p>
        {session ? (
          <p>
            {name} - {session}
          </p>
        ) : null}
        <p>Selected Date : {date ? date : today}</p>
        <div>
          Choose a session date :
          <select
            onChange={this.selectSession}
            value={this.state.selectedSession}
            name="session"
          >
            <option value={today}>Today</option>}
            {sessions &&
              sessions.map(session => {
                return (
                  <option value={session.date}>
                    {session.date} : {session.name} - {session.session}
                  </option>
                );
              })}
          </select>
        </div>
        {session ? (
          <div>
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
            <p>Attendance Percentage : % {proportion}</p>
          </div>
        ) : (
          <p>There is no results for today!, please select another date</p>
        )}
      </main>
    );
  }
}

export default MentorHome;
