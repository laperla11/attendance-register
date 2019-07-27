// Example JS object used for CSS styling
import React, {Component} from 'react';
const dayjs = require("dayjs");
import bcrypt from "bcryptjs";
import { setToken, checkRole } from '../../Auth/index'

import { insideCircle, headingDistanceTo } from "geolocation-utils";

import { withRouter, Browserhistory as history } from "react-router-dom";





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
   
    render() {
        const {
            email,
            password,
            status,
            position,
            isPositionConfirmed
          } = this.state;
      return (
          <form style={styles.form} onSubmit={this.handleOnSubmit}>
            <h4>Welcome Back!</h4>
            <div className='form-group row'>
              <input className='input' type='text' placeholder='Email'   value={email}
                    
                    onChange={e => {
                     
                      this.handleChange(e);
                    }}/>
            </div>
            <div className='form-group row'>
              <input className='input' type='password' placeholder='Password' value={password}
            onChange={e => this.handleChange(e)}/>
            </div>
            <div className='form-group row'>
              <button className='btn' type='submit'>Log In</button>
            </div>
            <div className='form-group row'>
              <button className='fb' type='submit'   onClick={e => this.handleSubmit(e)}>Connect with Facebook</button>
            </div>
          </form>
        
      )
    }
  }
  
 export default withRouter(Login)