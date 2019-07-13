import React, { Component } from "react";
import user from "../picture/user.svg";

class LoginAdmin extends Component {
  state = {
    email: "",
    password: ""
  };

  signIn(e) {
    e.preventDefault(e);
    console.log("this.state", this.state);
  }
  render() {
    return (
      <div className="form-container">
        <div className="form-group">
          <form className="form-internal">
            <div className="form-group">
              <h2 className="welcome">Welcome! Admin</h2>
              <img className="user-icon" src={user} />

              <input
                onChange={event => this.setState({ email: event.target.value })}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <input
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className=" myButton"
              onClick={event => this.signIn(event)}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginAdmin;
