import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInput } from "../util/customHooks";
import axios from "axios";
import RaffleParticipants from "./RaffleParticipants";

// Create logic that determines if raffle's secret_token matches input
// Create logic that shuffles raffle participants and selects a winner
// Build component to display raffle winner
// Finish NavBar functionality
// STYLE STYLE STYLE!!!!

const PickRaffleWinner = () => {
  const [raffleSecretToken, setRaffleSecretToken] = useState("");
  const [raffleParticipants, setRaffleParticipants] = useState([""]);
  const secretKey = useInput("");
  const params = useParams("/raffle/:id");
  const { id } = params;

  useEffect(() => {
    const fetchRaffle = async () => {
      try {
        let res = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/${id}`
        );
        setRaffleSecretToken(res.data.secret_token);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRaffle();
  }, []);

  useEffect(() => {
    const fetchRaffleParticipants = async () => {
      try {
        let res = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/${id}/participants`
        );
        setRaffleParticipants(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRaffleParticipants();
  }, []);

  //   const shuffle = (arr) => {
  //     for (let i = arr.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       const temp = arr[i];
  //       arr[i] = arr[j];
  //       arr[j] = temp;
  //     }
  //   };
  const handleRaffleWinner = async (e) => {
    e.preventDefault();
    // const pickWinner =
    //   raffleParticipants[Math.floor(Math.random() * raffleParticipants.length)];
    if (secretKey.value === raffleSecretToken) {
      debugger;
      try {
        await axios.put(
          `https://raffle-fs-app.herokuapp.com/raffle/${id}/winner`,
          { secret_token: secretKey.value }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      debugger;
      window.alert("Key incorrect, please try again.");
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
