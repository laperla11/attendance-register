/* eslint-disable react/prop-types */
import React from "react";
import "./index.css";

function StudentsList(props) {
  return (
    <div>
      <table className="blueTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Time of Arrival</th>
          </tr>
        </thead>
        <tbody>
          {props.students &&
            props.students
              .sort((a, b) => {
                return a.timeOfArrival.localeCompare(b.timeOfArrival);
              })
              .map(student => (
                <tr key={student.id}>
                  <td> {student.name} </td>
                  <td> {student.timeOfArrival} </td>
                </tr>
              ))}
          {/* {props.students.map(student => (
            <tr key={student.id}>
              <td> {student.name} </td>
              <td> 11: 10mn </td>
            </tr>
          ))} */}
          <tr className="total">
            <td colspan="2">Total : {props.total} </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const divStyle = { width: "400px" };

export default StudentsList;
