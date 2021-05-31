import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import RaffleHome from "../src/components/RaffleHome";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route>
          <RaffleHome exact path="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
