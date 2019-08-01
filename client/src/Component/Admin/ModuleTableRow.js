import React, { Component, Fragment } from "react";
import "./index.css";

export class ModuleTableRow extends Component {
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
    const { name, attendance, absence, attendanceRate } = this.props.modul;
    const { id } = this.props;
    return (
      <Fragment>
        <tr key={id} onClick={this.displayView} className="student-name">
          <td>{name}</td>
          <td>{attendance.length}</td>
          <td> {attendanceRate} %</td>
          <td>{absence.length}</td>
        </tr>
        {this.state.isViewDisplayed && attendance && (
          <tr className="studentAttendance">
            <td colspan="2">
              <h4 className="attendanceList">Attendance</h4>

              <div>
                {attendance.map(student => (
                  <p key={id + 1}>{student.name}</p>
                ))}
              </div>
            </td>
            <td colspan="2" className="absenceCell">
              <h4 className="absence">Absence</h4>
              <div>
                {absence.map(student => (
                  <p key={id + 10001}>{student.name}</p>
                ))}
              </div>
            </td>
          </tr>
        )}
      </Fragment>
    );
  }
}

export default ModuleTableRow;
