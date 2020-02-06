import React from "react";
import Landing from "./Views/Landing/landing";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import DetailsInfo from "./Views/DetailedInfo/DetailsInfo";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home" name="landing" component={Landing} />
          <Route path="/charts/:name" name="charts" component={DetailsInfo} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
