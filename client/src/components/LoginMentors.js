import React, { Component } from "react";

export class LoginMentor extends Component {
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
              <h2 className="welcome">Welcome! Mentor</h2>
              <span className="glyphicon glyphicon-user" />
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                onChange={event => this.setState({ email: event.target.value })}
                type="email"
                autoComplete="on"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                autoComplete="off"
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <button
              onClick={event => this.signIn(event)}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginMentor;
