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
      selectedSessionDate: dayjs().format("YYYY-MM-DD")
    };
  }

  componentWillMount() {
    fetch(`api/attendance`)
      .then(data => data.json())
      .then(data => this.setState({ data: data }));
  }

  selectSession = e => {
    const selectedSessionDate = e.target.value;
    this.setState({ selectedSessionDate });
  };

  render() {
    const { sessions } = this.state.data;
    const selectedSession =
      sessions &&
      sessions.find(session => session.date === this.state.selectedSessionDate);
    const today = dayjs().format("YYYY-MM-DD");
    return (
      <main className="main">
        <section className="register_Info">
          <h1>
            <span className="appName">Regi</span>
            <span className="appNameBack">Swift</span>
          </h1>
          <p>Today : {today}</p>
          {selectedSession ? (
            <p>
              {selectedSession.name} - {selectedSession.number}
            </p>
          ) : null}
          <p>
            Selected Date : {selectedSession ? selectedSession.date : today}
          </p>
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
                        {session.date} : {session.name} - {session.number}
                      </option>
                    );
                  })}
            </select>
          </p>
        </section>
        {selectedSession ? (
          <div>
            <div className="table-Results">
              <section className="studentsList">
                <h2>Students in Class</h2>
                <StudentsList
                  students={selectedSession.attendingStudents}
                  total={selectedSession.totalAttendingStudents}
                />
              </section>
              <section className="studentsList">
                <h2 className="absent">Students Absents</h2>
                <StudentsAbsents
                  students={selectedSession.absentStudents}
                  total={selectedSession.totalAbsentStudents}
                />
              </section>
            </div>
            <p className="attPercentage">
              Attendance Percentage : {selectedSession.attendanceRate} %
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
