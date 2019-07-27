// Example JS object used for CSS styling
import React, {Component} from 'react';
const dayjs = require("dayjs");
import bcrypt from "bcryptjs";
import { setToken, checkRole } from '../../Auth/index'

import { insideCircle, headingDistanceTo } from "geolocation-utils";

import { withRouter, Browserhistory as history } from "react-router-dom";


import './Login.css'


const styles = {
    facebookBtn: {
      backgroundColor: 'rgb(51, 89, 157)'
    },
    form: {
      textAlign: 'center'
    }
  }
  
  class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        status: "",
       
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
            .filter(session => session.date == "28/07/2019")
            .reduce(session => session);
          console.log(session.longitude);
          this.setState({ currentSession: session });
        });
      if (checkRole() === "STUDENT") {
        this.props.history.push("/studentRegistered");
      }
      if (checkRole() === "MENTOR") {
        this.props.history.push("/mentorHome");
      }
      if (checkRole() === "ADMIN") {
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
      console.log(!isPositionConfirmed && status.toLowerCase() == "student");
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
              setToken(
                "eyJfaWQiOiJsamhpcmZnaXloNGl2dWkzazRndW9nYmRvdWhyIiwibGFzdE5hbWUiOiJNb3JhZGkiLCJlbWFpbCI6Im1vaHNlbkBjb2RleW91cmZ1dHVyZS5pbyIsImNpdHkiOiJMb25kb24iLCJhdmF0YXIiOiJodHRwczovL2F2YXRhcnMzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzMwMzg5ODk2P3Y9NCIsImlhdCI6MTU2MzgwNjgxNn0"
              );
              localStorage.setItem("role", "STUDENT");
              return this.props.history.push("/studentRegistered");
            } else if (status.toUpperCase() === "MENTOR") {
              setToken(
                "eyJfaWQiOiJsamhpcmZnaXloNGl2dWkzazRndW9nYmRvdWhyIiwibGFzdE5hbWUiOiJNb3JhZGkiLCJlbWFpbCI6Im1vaHNlbkBjb2RleW91cmZ1dHVyZS5pbyIsImNpdHkiOiJMb25kb24iLCJhdmF0YXIiOiJodHRwczovL2F2YXRhcnMzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzMwMzg5ODk2P3Y9NCIsImlhdCI6MTU2MzgwNjgxNn0"
              );
              localStorage.setItem("role", "MENTOR");
              return this.props.history.push("/mentorHome");
            } else if (status.toUpperCase() === "ADMIN") {
              setToken(
                "eyJfaWQiOiJsamhpcmZnaXloNGl2dWkzazRndW9nYmRvdWhyIiwibGFzdE5hbWUiOiJNb3JhZGkiLCJlbWFpbCI6Im1vaHNlbkBjb2RleW91cmZ1dHVyZS5pbyIsImNpdHkiOiJMb25kb24iLCJhdmF0YXIiOiJodHRwczovL2F2YXRhcnMzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzMwMzg5ODk2P3Y9NCIsImlhdCI6MTU2MzgwNjgxNn0"
              );
              localStorage.setItem("role", "ADMIN");
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
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState({ position: position.coords });
          },
          error => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                alert(
                  "You denied the request for Geolocation, allow me to access you location in order to login to the className."
                );
                break;
              case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
            }
          }
        );
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
      console.log({ center });
      console.log("my location", poslat, poslong);
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
  
 
  
    render() {
        const {
            email,
            password,
            status,
            position,
            isPositionConfirmed
          } = this.state;
      return (
        <div className="container">
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
                  <input type="email"
                name="email"
             
                placeholder="email"
                value={email}
                
                onChange={e => {
                
                  this.handleChange(e);
}}/>
                  
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                  </div>
                  <input type="password"
                name="password"
               
                placeholder="********"
                value={password}
onChange={e => this.handleChange(e)}/>
                </div>
                
                <div className="form-group">
                  <button type="submit"  className="btn float-right login_btn"  value="STUDENT" onClick={e => this.handleSubmit(e)}>Student</button>
                </div>
                <div className="form-group">
                  <button type="submit"  className="btn float-right login_btn"  value="MENTOR" onClick={e => this.handleSubmit(e)}>Mentor</button>
                </div>
                <div className="form-group">
                  <button type="submit"  className="btn float-right login_btn"  value="ADMIN" onClick={e => this.handleSubmit(e)}>Admin</button>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
              <h5 classNameName="position">
            Your Position : <br />
            <span>Lat : {position.latitude}</span>
            <br />
            <span>Long : {position.longitude}</span>
</h5>
              </div>
              <div className="d-flex justify-content-center">
              {status.toLocaleLowerCase() == "student" &&
          isPositionConfirmed != "notChecked" &&
          !isPositionConfirmed ? (
            <p>Check your location , you are not at the className yet, hurry up!</p>
          ) : isPositionConfirmed === "confirmed" ? (
            <p>Your position is confirmed, enjoy the className!</p>
) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
        
      )
    }
  }
  
 export default withRouter(Login)