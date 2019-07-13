import React, { Component } from "react";
import users from "../data/users.json";
import modules from "../data/modules.json";
import AttendanceList from "./AttendanceList.js";
export default class Test extends Component {
  state = {
    users: users,
    modules: modules
  };
  render() {
    const { users, modules } = this.state;

    return (
      <div className="userInfo">
        <h2>User list</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user["id"]}>
                <td>{user["name"]}</td>
                <td>{user["city"]}</td>
                <td>{user["status"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Attendance list</h2>
        {modules.map(module=><AttendanceList module={module} />)}
        
      </div>
    );
  }
}
