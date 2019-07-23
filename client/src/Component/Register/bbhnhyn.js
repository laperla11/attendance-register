
import React, { Component } from 'react'
import {MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";

import { UncontrolledAlert } from 'reactstrap';
import { withRouter, Browserhistory as history } from "react-router-dom";

import { insideCircle } from "geolocation-utils";

export class bbhnhyn extends Component {
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
      const positionOfCYFOffice = { lat: 47.748000, lon:-0.3666 };
      const positionOfticketMaster = { lat: 89.748000, lon: -0.3666};
      const myHome = { lat: 52.3555177, lon: -1.1743196999999999 };
      const radius = 5000; // meters
      const result = insideCircle(
        { lat: poslat, lon: poslong },
        positionOfticketMaster,
        // myHome,
        radius
      );
      this.setState({ isPositionConfirmed : result});
      return result;
    };

  render() {
    return (
    
<MDBContainer>
<MDBRow>
  <MDBCol md="6">
    <MDBCard>
      <div className="header pt-3 peach-gradient">
        <MDBRow className="d-flex justify-content-center">
          <h3 className="white-text mb-3 pt-3 font-weight-bold">
            Log in
          </h3>
        </MDBRow>
        <MDBRow className="mt-2 mb-3 d-flex justify-content-center">
          <a href="#!" className="fa-lg p-2 m-2 fb-ic">
            <MDBIcon fab icon="facebook-f" size="lg" className="white-text" />
          </a>
          <a href="#!" className="fa-lg p-2 m-2 tw-ic">
            <MDBIcon className="fab fa-twitter white-text fa-lg" />
          </a>
          <a href="#!" className="fa-lg p-2 m-2 gplus-ic">
            <MDBIcon className="fab fa-google-plus-g white-text fa-lg" />
          </a>
        </MDBRow>
      </div>
      <MDBCardBody className="mx-4 mt-4">
        <MDBInput label="Your email" group type="text" validate 
        onChange={ (e) => {this.handleChange(e)
          this.validateEmail(e)
          this.handleChange(e)
        } }
        />
        <MDBInput
          label="Your password"
          group
          type="password"
          validate
          containerClass="mb-0"
          value={ password }
          onChange={ (e) => this.handleChange(e) }
        />
        <p className="font-small grey-text d-flex justify-content-end">
          Forgot
          <a
            href="#!"
            className="dark-grey-text ml-1 font-weight-bold"
          >
            Password?
          </a>
        </p>
        <MDBRow className="d-flex align-items-center mb-4 mt-5">
          <MDBCol md="5" className="d-flex align-items-start">
            <div className="text-center">
              <MDBBtn
                color="grey"
                rounded
                type="button"
                className="z-depth-1a"
                onClick={(e)=>this.handleSubmit(e)}
                color="light-blue"
                className="mb-3"
                type="submit"
              >
                Log in
              </MDBBtn>
              <MDBBtn
                color="grey"
                rounded
                type="button"
                className="z-depth-1a"
                onClick={(e)=>this.handleSubmit(e)}
                color="light-blue"
                className="mb-3"
                type="submit"
              >
                Log in
              </MDBBtn>
              <MDBBtn
                color="grey"
                rounded
                type="button"
                className="z-depth-1a"
                onClick={(e)=>this.handleSubmit(e)}
                color="light-blue"
                className="mb-3"
                type="submit"
              >
                Log in
              </MDBBtn>
            </div>
          </MDBCol>
          <MDBCol md="7" className="d-flex justify-content-end">
            <p className="font-small grey-text mt-3">
           
              <a
                href="#!"
                className="dark-grey-text ml-1 font-weight-bold"
              >
                Sign up
              </a>
            </p>
          </MDBCol>
          <MDBModalFooter>
                      <div className="font-weight-light">
                      <p className="text-sm-left">  Your Position :
            Lat : {position.latitude}</p>
                    <p className="text-sm-left"> Long : {position.longitude}</p>   
                      </div>
                    </MDBModalFooter>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
</MDBRow>
     
<MDBContainer>
{status.toLocaleLowerCase() == "student" &&
              isPositionConfirmed != "notChecked" &&
              !isPositionConfirmed ? (

<UncontrolledAlert color="warning">
<h6 className="mb-0" >Check your location , you are not at the class yet, hurry up!</h6>
    </UncontrolledAlert>
         
                  
                
              ) : isPositionConfirmed === "confirmed" ? (
<UncontrolledAlert color="info">
Your position is confirmed, enjoy the class!
    </UncontrolledAlert>

              ) : null}

    </MDBContainer>
</MDBContainer>
    )
  }
}

export default bbhnhyn


