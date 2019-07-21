import React, { Component } from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "styled-components";
import './jumbotron.css';



export class Jumbotron extends Component {
  render() {
    return (
    
     
        <Jumbo fluid >
          <div className="overlay" />
          <Container fluid>
              <div className='d-flex justify-content-center'>
                <div className="content__container">
                  <p className="content__container__text">
                  Hello
    </p>

                <ul className="content__container__list">
                  <li className="content__container__list__item">Student!</li>
                    <li className="content__container__list__item">Mentors!</li>
                    <li className="content__container__list__item">Admins!</li>
                    <li className="content__container__list__item">Welcome to CYF!</li>
                </ul>
              </div>
            </div>
          </Container>
        </Jumbo>
    
    
    );
  }
}

export default Jumbotron;
