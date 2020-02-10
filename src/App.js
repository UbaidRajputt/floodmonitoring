import React, { Component } from "react";
import Landing from "./Views/Landing/landing";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import DetailsInfo from "./Views/DetailedInfo/DetailsInfo";
import SignUp from "./Views/Auth/signup";
import Login from "./Views/Auth/login";
import firebase from "./Components/Firebase/firebaseSetup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticated => {
      authenticated
        ? this.setState(() => ({
            authenticated: true
          }))
        : this.setState(() => ({
            authenticated: false
          }));
    });
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div className="App">
        <Router>
          {authenticated ? (
            <Switch>
              <Route path="/home" name="landing" component={Landing} />
              <Route
                path="/charts/:name"
                name="charts"
                component={DetailsInfo}
              />
              <Redirect from="/" to="/home" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/login" name="login" component={Login} />
              <Route path="/signup" name="signup" component={SignUp} />
              <Redirect from="/" to="/login" />
            </Switch>
          )}
        </Router>
      </div>
    );
  }
}
export default App;
