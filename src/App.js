import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import RaffleHome from "../src/components/RaffleHome";
import RaffleRegister from "../src/components/RaffleRegister";
import RaffleParticipants from "./components/RaffleParticipants";
import PickRaffleWinner from "./components/PickRaffleWinner";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <RaffleHome />
        </Route>
        <Route exact path="/raffles/:id">
          <RaffleRegister />
        </Route>
        <Route path="/raffles/:id/participants">
          <RaffleParticipants />
        </Route>
        <Route path="/raffles/:id/winner">
          <PickRaffleWinner />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
