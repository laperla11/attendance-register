import React, { Component, Fragment } from "react";
import StudentsList from "../Mentor/StudentsList";
import StudentsAbsents from "../Mentor/StudentsAbsents";
import "../Mentor/index.css";
const moment = require("moment");

export class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isViewDisplayed: false
    };
  }
  displayView = e => {
    this.setState({ isViewDisplayed: !this.state.isViewDisplayed });
    this.props.handleView(
      moment(this.props.session.date, "YYYY-MM-DD").format("DD/MM/YYYY")
    );
  };

  render() {
    const {
      attendingStudents,
      totalAttendingStudents,
      absentStudents,
      totalAbsentStudents,
      proportion
    } = this.props;
    const { _id, date, city, name, session } = this.props.session;
    return (
      <Fragment>
        <tr key={_id}>
          <td>{moment(date, "YYYY-MM-DD").format("DD/MM/YYYY")}</td>
          <td>
            {name} - {session}
          </td>
          <td>{city}</td>
          <td>
            <button onClick={this.displayView} className="nav-btn-help">
              {this.state.isViewDisplayed ? " X " : " View "}
            </button>
          </td>
        </tr>
        <br />{" "}
        {this.state.isViewDisplayed && totalAttendingStudents && (
          <tr>
            <td colspan="4">
              <section className="">
                <h4>Students in Class</h4>
                <p>Total : {totalAttendingStudents}</p>
                <ul>
                  {attendingStudents.map(student => (
                    <li key={student._id}>{student.name}</li>
                  ))}
                </ul>
              </section>
              <section className="">
                <h4>Students Absents</h4>
                <p>Total : {totalAbsentStudents}</p>
                <ul>
                  {absentStudents.map(student => (
                    <li key={student._id}>{student.name}</li>
                  ))}
                </ul>
              </section>
              <br />
              <p>Attendance Percentage : % {proportion}</p>
            </td>
          </tr>
        )}
      </Fragment>
    );
  }
}
}
const divStyle = { width: "100%" };

export default TableRow;
