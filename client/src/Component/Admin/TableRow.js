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
  };

  render() {
    const {
      _id,
      date,
      city,
      name,
      session,
      attendingStudents,
      totalAttendingStudents,
      absentStudents,
      totalAbsentStudents,
      attendanceRate
    } = this.props.session;
    return (
      <Fragment>
        <tr key={_id} className="nav-tr-info">
          <td>{moment(date, "YYYY-MM-DD").format("DD/MM/YYYY")}</td>
          <td>
            {name} - {session}
          </td>
          <td>{city}</td>
          <td>
            <button
              onClick={this.displayView}
              className={
                this.state.isViewDisplayed ? "nav-btn-danger" : "nav-btn-help"
              }
            >
              {this.state.isViewDisplayed ? " Close " : " View "}
            </button>
          </td>
        </tr>
        {this.state.isViewDisplayed && totalAttendingStudents && (
          <tr className="studentAttendance">
            <td colspan="2">
              <h4 className="attendance">Students in Class</h4>
              <p>Total : {totalAttendingStudents}</p>
              <p>Percentage : {attendanceRate} %</p>
              <p>
                {attendingStudents.map(student => (
                  <p key={student._id}>{student.name}</p>
                ))}
              </p>
            </td>
            <td colspan="2" className="absenceCell">
              <h4 className="absence">Students Absents</h4>
              <p>Total : {totalAbsentStudents}</p>
              <p>Percentage : {(100 - attendanceRate).toFixed(2)} %</p>
              <p>
                {absentStudents.map(student => (
                  <p key={student._id}>{student.name}</p>
                ))}
              </p>
            </td>
          </tr>
        )}
      </Fragment>
    );
  }
}

const divStyle = { width: "100%" };

export default TableRow;
