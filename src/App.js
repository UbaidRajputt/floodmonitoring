import React, { Component } from "react";
import Landing from "./Views/Landing/landing";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Details from "./Views/DetailedInfo/charts";
import SignUp from "./Views/Auth/signup";
import Login from "./Views/Auth/login";
import firebase from "./Components/Firebase/firebaseSetup";
import ProtectedRoute from "./ProtectedRoute";
import AdminPanel from "./Views/AdminPanel/admin";
import EditProfile from "./Views/Profile/edit";

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
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <ProtectedRoute authenticated={authenticated} path="/home" component={Landing} />
            <ProtectedRoute authenticated={authenticated} path="/admin" component={AdminPanel} />
            <ProtectedRoute
              authenticated={authenticated}
              path="/charts/:name"
              component={Details}
            />
            <ProtectedRoute authenticated={authenticated} path="/edit/:name" component={EditProfile} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
