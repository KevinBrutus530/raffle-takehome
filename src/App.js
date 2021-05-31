import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import RaffleHome from "../src/components/RaffleHome";
import RaffleRegister from "../src/components/RaffleRegister";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <RaffleHome />
        </Route>
        <Route path="/raffle/:id">
          <RaffleRegister />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
