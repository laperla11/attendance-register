import React, { Component } from "react";
import MainPage from "./components/MainPage"
import { getMessage } from "./service";
import logo from "./logo.svg";
import "./App.css";
import Test from "./components/Test";
import { Route, Link, BrowserRouter as Router } from "react-router-dom"
import SignUp from "./components/Signup";

export class App extends Component {
  state = { message: "Loading..." };
=======

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Component/Header";
import SignUp from "./Component/Signup";
import Login from "./Component/Login";
import StudentRegister from "./Component/StudentRegister";
import MentorHome from "./Component/MentorHome";
import AdminHome from "./Component/AdminHome";


// import { getMessage } from "./service";
import "./App.css";

class App extends Component {


  render() {

    return (
      <Router>
        <Route path="/Signup" component={SignUp} />
        <Route path="/" component={MainPage} />
         {/* <Route path="/Test"component={Test} />  */}
      </Router>

      <Router>
        <header className="header">
          <Header />
        </header>
        <main className="main">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signUp" exact component={SignUp} />
            <Route path="/api/student" component={StudentRegister} />
            <Route path="/api/mentor" exact component={MentorHome} />
            <Route path="/api/admin" exact component={AdminHome} />
          </Switch>
        </main>
        <footer className="footer">
          <p>Semi-colon, Copyright july 2019</p>
        </footer>
      </Router >
    );
  }
}
export default App;
