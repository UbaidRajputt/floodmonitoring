import React, { Component } from "react";
import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';
import Landing from "./Views/Landing/landing";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Details from "./Views/DetailedInfo/details";
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
            <React.Fragment>
              <Header />
              <main>
                <Switch>
                  <Route path="/home" name="landing" component={Landing} />
                  <Route
                    path="/charts/:name"
                    name="charts"
                    component={Details}
                  />
                  <Redirect from="/" to="/home" />
                </Switch>
              </main>
              <Footer />
            </React.Fragment>
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
