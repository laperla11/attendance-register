
import React from "react";
import { MDBJumbotron, MDBContainer } from "mdbreact";
import './jumbotron.css';

   
      const Jumbotron = () => {
        return (
          <MDBJumbotron fluid style={{ backgroundColor: '#34495e', height:'70px' }} >
          <div className='overlay'/>
            <MDBContainer className='content'>
            <div className='content__container'>
              <h2 className="display-4 content__container__text" >Hello</h2>
             <ul className="content__container__list">
                  <li className="content__container__list__item">Student!</li>
                    <li className="content__container__list__item">Mentors!</li>
                    <li className="content__container__list__item">Admins!</li>
                    <li className="content__container__list__item">Welcome to CYF!</li>
                </ul>
                </div>
            </MDBContainer>
          </MDBJumbotron>
        )
      }
      
    
     
       
    
  
  


export default Jumbotron;
