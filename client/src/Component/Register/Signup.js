import React, { Component } from 'react';


import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormText, FormFeedback
} from 'reactstrap';
import './index.css';

import { withRouter, Browserhistory as history } from "react-router-dom";



// import Joi from "joi";

class SignUp extends Component {
  constructor(props) {
    super(props);
      this.state = {
      name:'',
      email: '',
      password: '',
     
      status:'',
      validate: {
        emailState: ''
      }
    }}
 
   handleInputChange =  (e) => {
      const { name, value } = e.target;
      this.setState({
        [name]: value
      });
    };
    handleSubmit = async (e) => {
      e.preventDefault();
      const { name,email, password,} = this.state;
     console.log(this.state);
     const data=this.state;
    
  
        try {
          const res = await fetch("api/register", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name:name,
              email: email,
              password: password,
              confirmPassword,
              status: e.target.value
            })
          });
          const json = await res.json();
          if (res.status !== 200) {
            alert(json.msg);
          } else {
            this.props.history.push("/thankYou ");
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
    const { validate } = this.state
      if (emailRex.test(e.target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }
      this.setState({ validate })
    }


  render() {
    const { name,email, password } = this.state;
    return (
    
       
        <Form className="form" >
          <Col md={6}>
          <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
              
                placeholder="name"
                value={ name }
               
                onChange={ (e) => {this.handleInputChange(e)
                    required      
                          } }
              />
              <FormFeedback valid>
                That's a tasty looking name you've got there.
              </FormFeedback>
                           
            </FormGroup>
            </Col>
            <Col md={6}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                value={ email }
                valid={ this.state.validate.emailState === 'has-success' }
                invalid={ this.state.validate.emailState === 'has-danger' }
                onChange={ (e) => {this.handleInputChange(e)
                            this.validateEmail(e)
                            this.handleInputChange(e)
                          } }
              />
              <FormFeedback valid>
                That's a tasty looking email you've got there.
              </FormFeedback>
              <FormFeedback>
                Uh oh! Looks like there is an issue with your email. Please input a correct email.
              </FormFeedback>
             
            </FormGroup>
         </Col >
          <Col md={6}>
         
            <FormGroup>
              <Label for="Password">Password</Label>
              <Input
                type="password"
                name="password"
                id="Password"
                placeholder="********"
                value={ password }
                onChange={ (e) => this.handleInputChange(e) }
            />
            </FormGroup>
                    
         
          </Col>
        
          <Button  onClick={(e) => this.handleSubmit(e)}
                type="submit"
                className="btn student"
                value="STUDENT">Sign Up as Student</Button>

                <Button  onClick={(e) => this.handleSubmit(e)}
                type="submit"
                className="btn mentor"
                value="STUDENT">Sign Up as Mentor</Button>

               
      </Form>


    
    );
  
}
  }

export default withRouter(SignUp);
