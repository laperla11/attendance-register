import React from "react"
import "../App.css"

export default class SignUp extends React.Component {

render(){
  return(
    <div className="registration_wrapper">
      <span onClick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
        <form className="modal-content" method="post" action="/action_page.php">
        <div className="container">
          <div className="upload_wrapper" >
          <input className="upload"type="file"  name="pic" accept="image/*" />
          </div>
            <label for="name"><b>Name</b></label><br/>
            <input type="text" placeholder="Enter Name" name="name" required />

            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required />

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required />

            <label for="psw-repeat"><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" name="psw-repeat" required />

            <label for="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" required />

            <label for ="registration_option"><b>Please select account type  </b>
            <select>
              <option value="select">Please Select</option>
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
              <option value="admin">Admin</option>
            </select> 
            </label>
            <br />
             <label>
            <input type="checkbox" checked="checked" name="remember" style={{marginBottom:"15px", marginTop:"15px"}} />Remember me
            </label>
            <p>By creating an account you agree to our <a href="#" style={{color:"dodgerblue"}}>Terms & Privacy</a>.</p>

            <div className="clearfix">
              <button type="submit" className="signupbtn">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
)
}
}