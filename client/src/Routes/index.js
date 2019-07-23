import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import SignUp from "../Component/Register/Signup";
import ThankYou from "../Component/Register/ThankYou";
import Login from "../Component/Register/Login";
import StudentRegister from "../Component/Student/StudentRegister";
import MentorHome from "../Component/Mentor/MentorHome";
import AdminHome from "../Component/Admin/AdminHome";
import StudentRoutes from '../Auth/student'
import MentorRoutes from '../Auth/mentor'
import AdminRoutes from '../Auth/admin'
export default class index extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signUp" exact component={SignUp} />
        <Route path="/thankYou" exact component={ThankYou} />
        <StudentRoutes path="/studentRegistered" component={StudentRegister} />
        <MentorRoutes path="/mentorHome" exact component={MentorHome} />
        <AdminRoutes path="/adminHome" exact component={AdminHome} />
      </Switch>
    );
  }
}
