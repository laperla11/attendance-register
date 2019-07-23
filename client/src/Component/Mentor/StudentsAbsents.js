/* eslint-disable react/prop-types */
import React from "react";

function StudentsList(props) {
  console.log(props.students);
  return (
    <div>
      <table className="blueTable">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {props.students &&
            props.students.map(student => (
              <tr key={student.id}>
                <td> {student.name} </td>
              </tr>
            ))}
          <tr>Total :{props.total}</tr>
        </tbody>
      </table>
    </div>
  );
}

export default StudentsList;
