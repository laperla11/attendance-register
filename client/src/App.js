import React, { Component } from "react";

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
        <Header />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signUp" exact component={SignUp} />
          <Route path="/api/student" component={StudentRegister} />
          <Route path="/api/mentor" exact component={MentorHome} />
          <Route path="/api/admin" exact component={AdminHome} />
        </Switch>
        <footer className="footer">
          <p>Semi-colon, Copyright july 2019</p>
        </footer>
      </Router >

    );
  }
}
export default App;
