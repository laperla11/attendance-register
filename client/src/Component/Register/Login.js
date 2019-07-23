import React, { Component } from "react";
import { withRouter, Browserhistory as history } from "react-router-dom";
import userIcon from "../image/user.png";
import "./index.css";
// import Joi from "joi";



class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      status: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      status: e.target.value,
    });
    const { email, password, status } = this.state;
    // fetch("http://localhost:3000/api/loginJoanTest", {

    // });
    if (status === "student") {
      return this.props.history.push("/api/studentRegistered");
    }
    if (status === "mentor") {
      return this.props.history.push("/mentorHome");
    }
    if (status === "admin") {
      return this.props.history.push("/api/adminHome");
    }
  }

  // validate = () => {
  //   const schema = {
  //     name: Joi.string().min(6).required(),
  //     email: Joi.string().min(6).required().email(),
  //     password: Joi.string().min(6).required(),
  //   };
  // }

  render() {
    const { email, password } = this.state;
    return (

      <main className="main">
        <h1>Register Attendance</h1>
        <div className="user">
          <img src={userIcon} alt="user icon" />
        </div>
        <div className="form">
          <form>
            <input type="text" value={email} name="email" placeholder="Email" onChange={(e) => this.handleChange(e)} required />
            <input type="password" value={password} name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} required />
            <section className="btnSection">
              <button
                onClick={(e) => this.handleSubmit(e)}
                type="submit"
                className="btn student"
                value="student" >Login as Student</button>

              <button
                onClick={(e) => this.handleSubmit(e)}
                type="submit"
                className="btn mentor"
                value="mentor" >Login as Mentor</button>

              <button onClick={(e) => this.handleSubmit(e)}
                type="submit"
                className="btn admin"
                value="admin" >Login as Admin</button>
            </section>
          </form>
        </div>
      </main>

    );
  }
}

export default withRouter(login);
