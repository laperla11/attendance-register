/* eslint-disable arrow-parens */
import React, { Component } from "react";
const dayjs = require("dayjs");
import bcrypt from "bcryptjs";
import { setToken, checkRole } from '../../Auth/index'
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

import { withRouter, Browserhistory as history } from "react-router-dom";

import "./Login.css";
import { insideCircle, headingDistanceTo } from "geolocation-utils";
// import Joi from "joi";


// //Hashed password
// const salt = await bcrypt.genSalt(10);
// const hashedPwd = await bcrypt.hash(password, salt);

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      status: "",
      validate: {
        emailState: ""
      },
      position: "",
      currentSession: "",
      isPositionConfirmed: "notChecked"
    };
  }
  componentWillMount() {
    this.getLocation();
    fetch(`api/sessions`)
      .then(res => res.json())
      .then(sessions => {
        // const session = sessions.filter(session=>session.date=dayjs().format("DD/MM/YYYY")).reduce(session=>session)
        const session = sessions
          .filter(session => session.date == "21/07/2019")
          .reduce(session => session);
        console.log(session.longitude)
        this.setState({ currentSession: session });
      });
    if (checkRole() === "STUDENT") {
      this.props.history.push("/studentRegistered");
    } if (checkRole() === "MENTOR") {
      this.props.history.push("/mentorHome");
    } if (checkRole() === "ADMIN") {
      this.props.history.push("/adminHome");
    }
  }
  handleChange = async e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password, position } = this.state;
    const status = e.target.value;
    this.setState({ status: status });
    let isPositionConfirmed = await this.confirmLocation(
      position.latitude,
      position.longitude
    );
    console.log({ isPositionConfirmed });
    if (!isPositionConfirmed && status.toLowerCase() == "student") {
      return this.props.history.replace("/studentRegistered");
    } else {
      // fetch("http://localhost:3000/api/loginJoanTest", {
      // });
      try {
        const res = await fetch("api/login", {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password,
            status: status
          })
        });
        const json = await res.json();
        if (res.status !== 200) {
          alert(json.msg);
        } else {
          if (status.toUpperCase() === "STUDENT") {
            setToken('eyJfaWQiOiJsamhpcmZnaXloNGl2dWkzazRndW9nYmRvdWhyIiwibGFzdE5hbWUiOiJNb3JhZGkiLCJlbWFpbCI6Im1vaHNlbkBjb2RleW91cmZ1dHVyZS5pbyIsImNpdHkiOiJMb25kb24iLCJhdmF0YXIiOiJodHRwczovL2F2YXRhcnMzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzMwMzg5ODk2P3Y9NCIsImlhdCI6MTU2MzgwNjgxNn0')
            localStorage.setItem('role', 'STUDENT');
            return this.props.history.push("/studentRegistered");
          } else if (status.toUpperCase() === "MENTOR") {
            setToken('eyJfaWQiOiJsamhpcmZnaXloNGl2dWkzazRndW9nYmRvdWhyIiwibGFzdE5hbWUiOiJNb3JhZGkiLCJlbWFpbCI6Im1vaHNlbkBjb2RleW91cmZ1dHVyZS5pbyIsImNpdHkiOiJMb25kb24iLCJhdmF0YXIiOiJodHRwczovL2F2YXRhcnMzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzMwMzg5ODk2P3Y9NCIsImlhdCI6MTU2MzgwNjgxNn0')
            localStorage.setItem('role', 'MENTOR');
            return this.props.history.push("/mentorHome");
          } else if (status.toUpperCase() === "ADMIN") {
            setToken('eyJfaWQiOiJsamhpcmZnaXloNGl2dWkzazRndW9nYmRvdWhyIiwibGFzdE5hbWUiOiJNb3JhZGkiLCJlbWFpbCI6Im1vaHNlbkBjb2RleW91cmZ1dHVyZS5pbyIsImNpdHkiOiJMb25kb24iLCJhdmF0YXIiOiJodHRwczovL2F2YXRhcnMzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzMwMzg5ODk2P3Y9NCIsImlhdCI6MTU2MzgwNjgxNn0')
            localStorage.setItem('role', 'ADMIN');
            return this.props.history.push("/adminHome");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // validate = () => {
  //   const schema = {
  //     name: Joi.string().min(6).required(),
  //     email: Joi.string().min(6).required().email(),
  //     password: Joi.string().min(6).required(),
  //   };
  // }
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          position: position.coords
        });
      });
    }
  };

  confirmLocation = async (poslat, poslong) => {
    const positionOfCYFOffice = {
      lat: 51.53,
      lon: -0.05
    };
    const positionOfticketMaster = {
      lat: 51.53,
      lon: -0.1
    };
    const myHome = {
      lat: 51.52,
      lon: -0.36
    };
    const { latitude, longitude } = this.state.currentSession;
    const center = {
      lat: Number(latitude),
      lon: Number(longitude)
    };
    console.log({ center })
    console.log("my location", poslat, poslong)
    // to calculate the distance to the target
    console.log(
      headingDistanceTo(center, {
        lat: poslat,
        lon: poslong
      })
    );
    const radius = 10000; // meters
    const result = insideCircle(
      {
        lat: poslat,
        lon: poslong
      },
      center,
      radius
    );
    this.setState({
      isPositionConfirmed: result
    });
    return result;
  };

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
    const {
      email,
      password,
      status,
      position,
      isPositionConfirmed
    } = this.state;
    return (
      <Container className="App">
        <h2>Sign In</h2>
        <Form className="form">
          <Col sm={6}>
            <FormGroup>
              <Label>email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                value={email}
                valid={this.state.validate.emailState === "has-success"}
                invalid={this.state.validate.emailState === "has-danger"}
                onChange={e => {
                  this.handleChange(e);
                  this.validateEmail(e);
                  this.handleChange(e);
                }}
              />

              <FormFeedback>
                Looks like there is an issue with your email. Please
               input a correct email.
              </FormFeedback>
              {/* <FormText>Your username is most likely your email.</FormText> */}
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                value={password}
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>
          </Col>
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
            <Button
              onClick={e => this.handleSubmit(e)}
              type="submit"
              className="btn admin"
              value="ADMIN"
            >
              Admin
            </Button>
          </div>
          <h5 className="position">
            Your Position : <br />
            <span>Lat : {position.latitude}</span>
            <br />
            <span>Long : {position.longitude}</span>
          </h5>
          {status.toLocaleLowerCase() == "student" &&
            isPositionConfirmed != "notChecked" &&
            !isPositionConfirmed ? (
              <p>Check your location , you are not at the class yet, hurry up!</p>
            ) : isPositionConfirmed === "confirmed" ? (
              <p>Your position is confirmed, enjoy the class!</p>
            ) : null}
        </Form>
      </Container>
    );
  }
}

export default withRouter(login);
