import React, { Component } from "react";
import { validateAll } from "indicative/validator";


import "./Login.css";

import { withRouter, Browserhistory as history } from "react-router-dom";

// import Joi from "joi";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",

      status: "",
      validate: {
        emailState: ""
      }
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    console.log(this.state);
    const data = this.state;

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          // confirmPassword,
          status: e.target.value
        })
      });
      const json = await res.json();
      if (res.status !== 200) {
        alert(json.msg);
      } else {
        this.props.history.push("/thankYou");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // validate = () => {
  //   const schema = {
  //     name: Joi.string().min(6).required(),
  //     email: Joi.string().min(6).required().email(),
  //     password: Joi.string().min(6).required(),
  //   };
  // }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  }

  render() {
    const { name, email, password } = this.state;
    return ( <div className="container">
    <div className="d-flex justify-content-center h-100">
      <div className="card">
        <div className="card-header">
          <h3>Sign In</h3>
     
        </div>
        <div className="card-body">
          <form>
          <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fas fa-user"></i></span>
              </div>
             
              <input  type="text"
                name="name"
                placeholder="name"
                value={name}
                required
                onChange={e => {
                  this.handleInputChange(e);
                }}/>
              
            </div>
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fas fa-user"></i></span>
              </div>
             
              <input  type="email"
                name="email"
                id="exampleEmail"
                placeholder="Email"
                value={email}
                valid={this.state.validate.emailState === "has-success"}
                invalid={this.state.validate.emailState === "has-danger"}
                onChange={e => {
                  this.handleInputChange(e);
                  this.validateEmail(e);
                  this.handleInputChange(e);
                }}/>
              
            </div>
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fas fa-key"></i></span>
              </div>
              <input   type="password"
                name="password"
                id="Password"
                placeholder="********"
                value={password}
                onChange={e => this.handleInputChange(e)}/>
            </div>
            
            <div className="form-group">
              <button type="submit"  className="btn float-right login_btn"  value="STUDENT" onClick={e => this.handleSubmit(e)}> Student</button>
            </div>
            <div className="form-group">
              <button type="submit"  className="btn float-right login_btn"  value="MENTOR" onClick={e => this.handleSubmit(e)}>Mentor</button>
            </div>
           
          </form>
        </div>
      
      </div>
    </div>
  </div>
    
    
    );
  }
}

export default withRouter(SignUp);
