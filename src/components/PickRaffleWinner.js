import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInput } from "../util/customHooks";
import axios from "axios";

// Create logic that determines if raffle's secret_token matches input
// Create logic that shuffles raffle participants and selects a winner
// Build component to display raffle winner
// Finish NavBar functionality
// STYLE STYLE STYLE!!!!

const PickRaffleWinner = () => {
  const secretKey = useInput("");
  const params = useParams("/raffle/:id");
  const { id } = params;

  const handleRaffleWinner = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://raffle-fs-app.herokuapp.com/raffle/${id}/winner`,
        { secret_token: secretKey }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Pick a Winner</h1>
      <form onSubmit={handleRaffleWinner}>
        <label>
          Secret Key:
          <input type="text" {...secretKey} required />
        </label>
        <button type="submit">Pick Winner</button>
      </form>
    </div>
  );
};

export default PickRaffleWinner;
