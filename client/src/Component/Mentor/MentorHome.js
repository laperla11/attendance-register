import React, { Component } from "react";
import StudentsList from "./StudentsList";
import StudentsAbsents from "./StudentsAbsents";
import "./index.css";
import dayjs from "dayjs";

class MentorHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      sessions: "",
      selectedSession: "",
      selectedSessionDate: "today"
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    fetch(`api/attendance?date=${this.state.selectedSessionDate}`)
      .then(data => data.json())
      .then(data => this.setState({ data: data }));
  };

  selectSession = e => {
    const selectedSessionDate = e.target.value;
    this.setState({ selectedSessionDate }, () => this.fetchData());
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
    } = this.state.data;
    const today = dayjs().format("YYYY-MM-DD");
    return (
      <main className="main">
        <section className="register_Info">
          <h1>
            <span className="appName">Regi</span>
            <span className="appNameBack">Swift</span>
          </h1>
          <p>Today : {today}</p>
          {session ? (
            <p>
              {name} - {session}
            </p>
          ) : null}
          <p>Selected Date : {date ? date : today}</p>
          <p>
            Choose a session date{" "}
            <select
              onChange={this.selectSession}
              value={this.state.selectedSessionDate}
              name="session"
            >
              <option value={today}>Today</option>}
              {sessions &&
                sessions
                  .sort((a, b) => {
                    return new Date(a.date) > new Date(b.date) ? -1 : 1;
                  })
                  .map(session => {
                    return (
                      <option value={session.date}>
                        {session.date} : {session.name} - {session.session}
                      </option>
                    );
                  })}
            </select>
          </p>
        </section>
        {session ? (
          <div>
            <div className="table-Results">
              <section className="studentsList">
                <h2>Students in Class</h2>
                <StudentsList
                  students={attendingStudents}
                  total={totalAttendingStudents}
                />
              </section>
              <section className="studentsList">
                <h2 className="absent">Students Absents</h2>
                <StudentsAbsents
                  students={absentStudents}
                  total={totalAbsentStudents}
                />
              </section>
            </div>
            <p className="attPercentage">
              Attendance Percentage : {proportion} %
            </p>
          </div>
        ) : (
          <p className="extra-text">
            There is no results for today, please select another date !
          </p>
        )}
      </main>
    );
  }
}

export default MentorHome;
