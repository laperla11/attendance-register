import React, { Component } from "react";
// import imgSrc from "../image/user.png";

import "./index.css";

class StudentRegister extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  render() {
    return (
      <main className="main mainAttendance">
        <h1>Welcome, </h1>
        <div className="user attendance">
          <h2>Your attendance has been registered</h2>
        </div>
        <h2>Enjoy your class !</h2>

      </main>
    );
  }
}

export default StudentRegister;
