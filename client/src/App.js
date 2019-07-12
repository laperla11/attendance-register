import React, { Component } from "react";
import LoginStudent from "./components/LoginStudent";
import LoginMentors from "./components/LoginMentors";
import LoginAdmin from "./components/LoginAdmin";
import Navigation from "./components/Navigation";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
          <BrowserRouter>
            <NavigationBar />

            <Switch>

              <Route path="/LoginAdmin" component={LoginAdmin} />
              <Route path="/LoginMentors" component={LoginMentors} />
              <Route path="/LoginStudent" component={LoginStudent} />
            </Switch>

            <Navigation />
          </BrowserRouter>
        </div>
        {/* <p className="message" data-qa="message">
          {message}
        </p> */}
      
      </div>
    );
  }
}
export default App;
