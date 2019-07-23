import React, { Component } from "react";
import { withRouter, history } from "react-router-dom";
import userIcon from "../image/user.png";
import "./index.css";



class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      status: "",
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     name: "",
  //     email: "",
  //     password: "",
  //   });
  // }

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


    const { name, email, password, status } = this.state;
    fetch("http://localhost:3000/api/registerJoanTest", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        status: status,
      }),
    });
    this.props.history.push("/thankYou");
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <main className="main">
        <h1>Register Attendance</h1>
        <div className="user">
          <img src={userIcon} alt="user icon" />
        </div>
        <div className="form">
          <form >
            <input type="text" value={name} name="name" placeholder="name" onChange={(e) => this.handleChange(e)} required />
            <input type="text" value={email} name="email" placeholder="Email" onChange={(e) => this.handleChange(e)} required />
            <input type="password" value={password} name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} required />
            <section className="btnSection">
              <button type="submit" onClick={(e) => this.handleSubmit(e)} className="btn student" value="student">Sign up as Student</button>
              <button type="submit" onClick={(e) => this.handleSubmit(e)} className="btn mentor" value="mentor" >Sign up as Mentor</button>
            </section>
          </form>
        </div>
      </main>
    );
  }
}

export default withRouter(SignUp);
