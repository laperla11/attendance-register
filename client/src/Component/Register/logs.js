/* eslint-disable arrow-parens */
import React, { Component, Fragment } from "react";
import { validateAll } from "indicative/validator";
import { withRouter, Browserhistory as history } from "react-router-dom";
import "./index.css";

import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  FormFeedback
} from "reactstrap";


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
    return (
      // <Container className="App">
      <Fragment>

        <Form className="form">
          <h2 className="registerTitle">SignUp</h2>

          <div className="formGroupBlock">
            <FormGroup className="formGroup">
              <Label for="name" className="labelTag">Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="name"
                value={name}
                required
                onChange={e => {
                  this.handleInputChange(e);
                }}
              />
              <FormFeedback valid>
                That's a tasty looking name you've got there.
              </FormFeedback>
            </FormGroup>

            <FormGroup className="formGroup">
              <Label for="email" className="labelTag">email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                value={email}
                valid={this.state.validate.emailState === "has-success"}
                invalid={this.state.validate.emailState === "has-danger"}
                onChange={e => {
                  this.handleInputChange(e);
                  this.validateEmail(e);
                  this.handleInputChange(e);
                }}
              />

              <FormFeedback>
                Looks like there is an issue with your email. Please
                input a correct email.
              </FormFeedback>
              {/* <FormText>Your username is most likely your email.</FormText> */}
            </FormGroup>


            <FormGroup className="formGroup">
              <Label for="Password" className="labelTag">Password</Label>
              <Input
                type="password"
                name="password"
                id="Password"
                placeholder="********"
                value={password}
                onChange={e => this.handleInputChange(e)}
              />
            </FormGroup>
          </div>
          <div className="button-group">
            <Button
              onClick={e => this.handleSubmit(e)}
              type="submit"
              className="btn student"
              value="STUDENT"
            >
              Student
            </Button>

            <Button
              onClick={e => this.handleSubmit(e)}
              type="submit"
              className="btn mentor"
              value="MENTOR"
            >
              Mentor
            </Button>
          </div>
        </Form>
      </Fragment>

    );
  }
}

export default withRouter(SignUp);