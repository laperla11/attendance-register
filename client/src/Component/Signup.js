import React, { Component } from "react";
import userIcon from "./image/user.png";



class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
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
    if (e.target.dataset.key === "student") {
      console.log("welcome student");
    }
    if (e.target.dataset.key === "mentor") {
      console.log("welcome mentor");
    }
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <main className="main">
        <div className="user">
          <img src={userIcon} alt="user icon" />
        </div>
        <div className="form">
          <form onSubmit={(e) => this.handleSubmit(e)} action="/register">
            <input type="text" value={name} name="name" placeholder="name" onChange={(e) => this.handleChange(e)} /> <br />
            <input type="text" value={email} name="email" placeholder="Email" onChange={(e) => this.handleChange(e)} /> <br />
            <input type="text" value={password} name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} /> <br />
            <section className="btnSection">
              <button className="btn student" data-key="student">Sign up as Student</button>
              <button className="btn mentor" data-key="mentor" >Sign up as Mentor</button>
            </section>
          </form>
        </div>
      </main>
    );
  }
}

export default login;
