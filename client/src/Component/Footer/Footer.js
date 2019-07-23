import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import './index.css'

const FooterPage = () => {
  return (
    <MDBFooter color="blueblack" className="font-small pt-4 mt-4">
      
     
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://github.com/laperla11/attendance-register"> Semi-Colon </a>
        </MDBContainer>
   
    </MDBFooter>
  );
}

export default FooterPage;
