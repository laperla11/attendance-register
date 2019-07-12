import React, { Component } from "react";
import LoginStudent from "./components/LoginStudent";
import LoginMentors from "./components/LoginMentors";
import LoginAdmin from "./components/LoginAdmin";
import Navigation from "./components/Navigation";
import NavigationBar from "./components/NavigationBar";
import { HashRouter, Route, Switch } from "react-router-dom";
import { getMessage } from "./service";

import "./App.css";
//import Test from "./components/Test";
export class App extends Component {
  state = { message: "Loading..." };

  componentDidMount() {
    getMessage().then(message => this.setState({ message }));
  }

  render() {
    const { message } = this.state;
    return (
      <div>
        <div className="flex-container">
          <HashRouter>
            <NavigationBar />

            <Switch>
              <Route path="/admin" component={LoginAdmin} />
              <Route path="/mentor" component={LoginMentors} />
              <Route path="/student" component={LoginStudent} />
            </Switch>

            <Navigation />
          </HashRouter>
        </div>
        {/* <p className="message" data-qa="message">
          {message}
        </p> */}
      </div>
    );
  }
}
export default App;
