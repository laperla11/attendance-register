import React, { Component } from "react";
import userIcon from "./image/user.png";



class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    this.setState({
      name: "",
      email: "",
      password: "",
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  render() {
    const { name, email, password } = this.state;
    return (
      <main className="main">
        <div className="user">
          <img src={userIcon} alt="user icon" />
        </div>
        <div className="form">
          <form >
            <input type="text" value={name} name="name" placeholder="name" onChange={(e) => this.handleChange(e)} /> <br />
            <input type="text" value={email} name="email" placeholder="Email" onChange={(e) => this.handleChange(e)} /> <br />
            <input type="text" value={password} name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} /> <br />
            <section className="btnSection">
              <button className="btn student">Sign up as a Student</button>
              <button className="btn mentor">Sign up as Mentor</button>
            </section>
          </form>
        </div>
      </main>
    );
  }
}

export default login;
