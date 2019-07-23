import React, { Component } from 'react';
import { withRouter, Browserhistory as history } from "react-router-dom";
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormText, FormFeedback,
} from 'reactstrap';
<<<<<<< HEAD
import './Login.css';
=======
import { withRouter, Browserhistory as history } from "react-router-dom";

import './index.css'
>>>>>>> 23045523edba015565eed0b44b27fdc11a0a812f
import { insideCircle } from "geolocation-utils";

class Login extends Component {
  constructor(props) {
    super(props);
      this.state = {
      'email': '',
      'password': '',
      status:'',
      validate: {
        emailState: '',
      },
       position:'',
      isPositionConfirmed: "notChecked"
    };
    this.handleChange = this.handleChange.bind(this);
  }
<<<<<<< HEAD
  componentWillMount(){
    this.getLocation();
  }
  handleChange = async (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, position} = this.state;
    let isPositionConfirmed = this.confirmLocation(position.latitude, position.longitude);
    const status = e.target.value;
    this.setState({ status: status });
    if (
      !isPositionConfirmed &&
      status.toLowerCase() == "student"
    ) {
      return this.props.history.push("/");
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
            return this.props.history.push("/studentRegistered");
          } else if (status.toUpperCase() === "MENTOR") {
            return this.props.history.push("/mentorHome");
          } else if (status.toUpperCase() === "ADMIN") {
            return this.props.history.push("/adminHome");
=======
    componentWillMount(){
      this.getLocation();
    }
    handleChange = async (e) => {
      const { name, value } = e.target;
      this.setState({
        [name]: value
      });
    };
    handleSubmit = async (e) => {
      e.preventDefault();
      const { email, password, position} = this.state;
      let isPositionConfirmed = this.confirmLocation(position.latitude, position.longitude);
      const status = e.target.value;
      this.setState({ status: status });
      if (
        !isPositionConfirmed &&
        status.toLowerCase() == "student"
      ) {
        return this.props.history.push("/");
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
              return this.props.history.push("/studentRegistered");
            } else if (status.toUpperCase() === "MENTOR") {
              return this.props.history.push("/mentorHome");
            } else if (status.toUpperCase() === "ADMIN") {
              return this.props.history.push("/adminHome");
            }
>>>>>>> 23045523edba015565eed0b44b27fdc11a0a812f
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
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          position: position.coords
        });
<<<<<<< HEAD
      });
    }
  };

  confirmLocation = (poslat, poslong) => {
    console.log(poslat, poslong);
    const positionOfCYFOffice = { lat: 51.53, lon: -0.05 };
    const positionOfticketMaster = { lat: 51.53, lon: -0.1 };
    const myHome = { lat: 51.52, lon: -0.36 };
    const radius = 1000; // meters
    const result = insideCircle(
      { lat: poslat, lon: poslong },
      positionOfCYFOffice,
      // myHome,
      radius
    );
    this.setState({ isPositionConfirmed : result});
    return result;
  };

  validateEmail(e) {
=======
      }
    };
  
    confirmLocation = (poslat, poslong) => {
      console.log(poslat, poslong);
      const positionOfCYFOffice = { lat: 51.53, lon: -0.05 };
      const positionOfticketMaster = { lat: 51.53, lon: -0.1 };
      const myHome = { lat: 51.52, lon: -0.36 };
      const radius = 1000; // meters
      const result = insideCircle(
        { lat: poslat, lon: poslong },
        positionOfCYFOffice,
        // myHome,
        radius
      );
      this.setState({ isPositionConfirmed : result});
      return result;
    };
  
   validateEmail(e) {
>>>>>>> 23045523edba015565eed0b44b27fdc11a0a812f
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
      if (emailRex.test(e.target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }
      this.setState({ validate })
    }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [ name ]: value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    console.log(`Email: ${ this.state.email }`)
  }

  render() {
    const { email, password, status,position, isPositionConfirmed  } = this.state;
    return (
<<<<<<< HEAD
      <Container className="app">
        <h2>Sign In</h2>
        <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
          <Col>
=======
      <Container className="App">
        <h2>Sign In</h2>
        <Form className="form" >
          <Col md={6}>
>>>>>>> 23045523edba015565eed0b44b27fdc11a0a812f
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                value={ email }
                valid={ this.state.validate.emailState === 'has-success' }
                invalid={ this.state.validate.emailState === 'has-danger' }
                onChange={ (e) => {
                            this.validateEmail(e)
                            this.handleChange(e)
                          } }
              />
              <FormFeedback valid>
                That's a tasty looking email you've got there.
              </FormFeedback>
              <FormFeedback>
                Uh oh! Looks like there is an issue with your email. Please input a correct email.
              </FormFeedback>
              <FormText>Your username is most likely your email.</FormText>
            </FormGroup>
          </Col>
<<<<<<< HEAD
          <Col>
=======
          <Col md={6}>
>>>>>>> 23045523edba015565eed0b44b27fdc11a0a812f
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                value={ password }
                onChange={ (e) => this.handleChange(e) }
            />
            </FormGroup>
          </Col>
          <div className="button-group">
          <Button  onClick={(e) => this.handleSubmit(e)}
                type="submit"
                className="btn student"
                value="STUDENT">Login as Student</Button>
                 <Button  onClick={(e) => this.handleSubmit(e)}
                type="submit"
                className="btn mentor"
                value="MENTOR">Login as Mentor</Button>
                <Button  onClick={(e) => this.handleSubmit(e)}
                type="submit"
                className="btn admin"
                value="ADMIN">Login as Admin</Button></div>
                 <h5 className='position'>Your Position : <br></br>
            <span >Lat : {position.latitude}</span><br/>
            <span >Long : {position.longitude}</span></h5>
            {status.toLocaleLowerCase() == "student" &&
              isPositionConfirmed != "notChecked" &&
              !isPositionConfirmed ? (
                <p>
                  Check your location , you are not at the class yet, hurry up!
                </p>
              ) : isPositionConfirmed === "confirmed" ? (
                <p>Your position is confirmed, enjoy the class!</p>
              ) : null}

      </Form>
      </Container>
    );
  }
}


export default withRouter(Login);
