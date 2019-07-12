import React from "react"
import {Link} from "react-router-dom"
import Test from "./Test";
export default class MainPage extends React.Component{

    render() {
        return(
             <div>
                // {/* <img
                  //   className="logo"S
                   //   data-qa="logo"
                  //   src={logo}
                  //   alt="Just the React logo"
                   // /> */}
              <div className="App_form">
                <div className="heading">
                  <div className="logo_Wrapper">
                     <img src ="https://i.postimg.cc/fyqrcp49/cyf-brand.png" />
                  </div>
                </div>
                <div className="pageSwitcher">
                   <Link to="/Signup" className="pageSwitcher_item pageSwitcher_item--Active">Sign Up</Link> 
                </div>
                <div id="id01" className="modal">
                   {/* <p className="message" data-qa="message"> */}
                    {/* {message}
                   */}
                   {/* </p> */}
                </div>
              </div>
              <Test />
            </div>
        )
    }
}