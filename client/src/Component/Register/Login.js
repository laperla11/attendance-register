import React, { Component } from 'react';
import {
  Container, Col,Row, Form,
  FormGroup, Label, Input,
  Button, FormText, FormFeedback,
} from 'reactstrap';
import { UncontrolledAlert } from 'reactstrap';
import { withRouter, Browserhistory as history } from "react-router-dom";


import './index.css'
import { insideCircle } from "geolocation-utils";
// import Joi from "joi";

class login extends Component {
  constructor(props) {
    super(props);
      this.state = {
      email: '',
      password: '',
      status:'',
      validate: {
        emailState: ''
      },
      position:'',
      isPositionConfirmed: "notChecked"
    };
  }
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
        });
      }
    };
  
    confirmLocation = (poslat, poslong) => {
      console.log(poslat, poslong);
      const positionOfCYFOffice = { lat: 51.748000, lon:-0.3666 };
      const positionOfticketMaster = { lat: 51.748000, lon: -0.3666};
      const myHome = { lat: 51.52, lon: -0.366666 };
      const radius = 5000; // meters
      const result = insideCircle(
        { lat: poslat, lon: poslong },
        myHome,
        // myHome,
        radius
      );
      this.setState({ isPositionConfirmed : result});
      return result;
    };
  
   validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
      if (emailRex.test(e.target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }
      this.setState({ validate })
    }

  render() {
    const { email, password,status,position,  isPositionConfirmed } = this.state;
    return (
      <Container className="App">
       
        <Form className="form" >
          <Col  md={6}>
            <FormGroup >
            <h2>Sign In</h2>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                value={ email }
                valid={ this.state.validate.emailState === 'has-success' }
                invalid={ this.state.validate.emailState === 'has-danger' }
                onChange={ (e) => {this.handleChange(e)
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
          <Col  md={6}>
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
          </Col >
          <div className="button-group">
          <Button  onClick={(e) => this.handleSubmit(e)}
                type="submit"
                className="btn student"
                value="STUDENT">Login as Student</Button>
                <Button  onClick={(e) => this.handleSubmit(e)}
                type="submit"
                className="btn mentor"
                value="STUDENT">Login as Mentor</Button>{''}
                <Button  onClick={(e) => this.handleSubmit(e)}
                type="submit"
                className="btn admin"
                value="STUDENT">Login as admin</Button></div>
                 <h6 className='position'>Your Position :
            <span >Lat : {position.latitude}</span><br/>
            <span >Long : {position.longitude}</span></h6>
            {status.toLocaleLowerCase() == "student" &&
              isPositionConfirmed != "notChecked" &&
              !isPositionConfirmed ? (

<UncontrolledAlert color="warning">
<p className="mb-0" >Check your location , you are not at the class yet, hurry up!</p>
    </UncontrolledAlert>
         
                  
                
              ) : isPositionConfirmed === "confirmed" ? (
<UncontrolledAlert color="info">
Your position is confirmed, enjoy the class!
    </UncontrolledAlert>

              ) : null}
      </Form>


      </Container>
    );
  }
}

export default withRouter(login);
