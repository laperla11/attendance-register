import React, { Component, Fragment } from "react";
import "./index.css";

export default class StudentTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isViewDisplayed: false
    };
  }

  displayView = () => {
    this.setState({
      isViewDisplayed: !this.state.isViewDisplayed
    });
  };

  render() {
    const { student } = this.props;
    // console.log({ student });
    return (
      <Fragment>
        <tr
          key={student._id}
          className="student-name"
          onClick={this.displayView}
        >
          <th scope="row">{student.name}</th>
          <td>{student.attendanceRate} %</td>
          <td>
            {student.missedAnyModule.length > 0
              ? student.missedAnyModule.join(", ")
              : "none"}
          </td>
        </tr>

        {this.state.isViewDisplayed && (
          <Fragment>
            <tr className="studentAttendance">
              <td colspan="2">
                <h4 className="attendanceList">Attendance : </h4>
                {/* <h4>Total : {student.attendance.length}</h4> */}
                <div>
                  {student.attendance
                    .sort((a, b) => {
                      return new Date(a.date) > new Date(b.date) ? -1 : 1;
                    })
                    .map(session => {
                      return (
                        <p key={session.id}>
                          {session.name} - {session.number} ({session.date})
                        </p>
                      );
                    })}
                </div>
              </td>

              <td colspan="2" className="absenceCell">
                <h4 className="absence">Absence : </h4>
                {/* <h4>Total : {student.absence.length}</h4> */}
                <div>
                  {student.absence
                    .sort((a, b) => {
                      return new Date(a.date) > new Date(b.date) ? -1 : 1;
                    })
                    .map(session => {
                      return (
                        <p key={session.id}>
                          {session.name} - {session.session} ({session.date})
                        </p>
                      );
                    })}
                </div>
              </td>
            </tr>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
