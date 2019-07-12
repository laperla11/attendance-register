import React, { Component, Fragment } from "react";
import userIcon from "./image/user.png";
// import Joi from "joi";



class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }


  // componentDidMount() {
  //   this.setState({
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
    console.log(e.currentTarget);
    // if (e.target.dataset.key === "student") {
    //   console.log("welcome student");
    // }
    // if (e.target.dataset.key === "mentor") {
    //   console.log("welcome mentor");
    // }
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

      <Fragment>
        <h1>Welcome</h1>
        <div className="user">
          <img src={userIcon} alt="user icon" />
        </div>
        <div className="form">
          <form onSubmit={(e) => this.handleSubmit(e)} action="/login">
            <input type="text" value={email} name="email" placeholder="Email" onChange={(e) => this.handleChange(e)} /> <br />
            <input type="text" value={password} name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} /> <br />
            <section className="btnSection">
              <button className="btn student" data-key="student" >Login as Student</button>
              <button className="btn mentor" data-key="mentor" >Login as Mentor</button>
            </section>
          </form>
        </div>
      </Fragment>

    );
  }
}

export default login;
