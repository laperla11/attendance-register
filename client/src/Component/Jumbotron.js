
import React from "react";
import { MDBJumbotron, MDBContainer } from "mdbreact";
import './jumbotron.css';

<<<<<<< HEAD
   
      const Jumbotron = () => {
        return (
          <MDBJumbotron fluid style={{ backgroundColor: '#34495e', height:'70px' }} >
          <div className='overlay'/>
            <MDBContainer className='content'>
            <div className='content__container'>
              <h2 className="display-4 content__container__text" >Hello</h2>
             <ul className="content__container__list">
=======
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
>>>>>>> 23045523edba015565eed0b44b27fdc11a0a812f
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
