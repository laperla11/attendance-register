import React, { Component } from "react";
import CreateSession from "./CreateSession";
import "./index.css";
import TableRow from "./TableRow";

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      name: "",
      date: "",
      city: "",
      latitude: "",
      longitude:"",
      session: ""
    };
  }

  fetchData = () => {
    fetch(`api/attendance?date=${this.state.selectedSession}`)
      // fetch("https://jsonplaceholder.typicode.com/users")
      // fetch("api/attendance")
      .then(data => data.json())
      .then(data => this.setState({ data: data }));
  };

  componentWillMount() {
    this.setState(
      { selectedSession: "today" },
      () => (setInterval(this.fetchData(), 1000))
    );
  }
  selectSession = date => {
    // this.setState({ selectedSession: e.target.value }, () =>
    //   setInterval(this.fetchData, 2000)
    // );
    console.log(date)
    this.setState({ selectedSession: date }, () => this.fetchData());
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, date, city, session, latitude, longitude } = this.state;
    const reqBody = { name, date, session, city, latitude, longitude };
    const reqParams = {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify(reqBody)
    };
    fetch(`/api/createSession`, reqParams).then(res => {
      if (res.status == 200) {
        alert("New session created!");
      } else {
        alert("Session couldn't be created try again");
      }
    });
  };

  render() {
    // const { name, date, city, session } = this.state;
    // console.log(name, session, city, date);
    const {
      name,
      city,
      date,
      session,
      attendingStudents,
      totalAttendingStudents,
      absentStudents,
      totalAbsentStudents,
      proportion,
      sessions
    } = this.state.data;
    console.log(this.state.data);
    return (
      <main className="row">
        <div className="md-col-6">
          <CreateSession
            name={this.state.name}
            city={this.state.city}
            date={this.state.date}
            session={this.state.session}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
        <div className="md-col-6">
          <section style={{ marginLeft: "50px" }}>
            <h3 className="text-center mb-1">Sessions</h3>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Module-Session</th>
                  <th scope="col">City</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions &&
                  sessions.map(session => {
                    return (
                      <TableRow
                        session={session}
                        attendingStudents={attendingStudents}
                        totalAttendingStudents={totalAttendingStudents}
                        absentStudents={absentStudents}
                        totalAbsentStudents={totalAbsentStudents}
                        proportion={proportion}
                        handleView={this.selectSession}
                      />
                    );
                  })}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    );
  }
}

export default AdminHome;
