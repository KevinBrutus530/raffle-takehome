import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInput } from "../util/customHooks";
import Button from "@material-ui/core/Button";
import axios from "axios";
import NavBar from "./NavBar";

// Build component to display raffle winner
// Finish NavBar functionality
// STYLE STYLE STYLE!!!!

const PickRaffleWinner = () => {
  const [raffleSecretToken, setRaffleSecretToken] = useState("");
  const [raffleParticipants, setRaffleParticipants] = useState([""]);
  const [raffleWinner, setRaffleWinner] = useState({});
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

  const handleRaffleWinner = async (e) => {
    e.preventDefault();
    if (secretKey.value === raffleSecretToken) {
      const correctToken = { secret_token: raffleSecretToken };
      try {
        await axios.put(
          `https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/${id}/winner`,
          correctToken
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      window.alert("Key incorrect, please try again.");
    }
  };

  const pickWinner = (arr) => {
    let winner = arr[Math.floor(Math.random() * arr.length)];
    setRaffleWinner(winner);
    return (
      <div>
        <h3>
          {winner.firstname} {winner.lastname}
        </h3>
        <p>{winner.id}</p>
        <p>{winner.email}</p>
        <p>{winner.phone}</p>
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      <h1>Pick a Winner</h1>
      <form onSubmit={handleRaffleWinner}>
        <label>
          Secret Key:
          <input type="text" {...secretKey} required />
        </label>
        <Button type="submit" variant="contained" color="primary">
          Pick Winner
        </Button>
      </form>
      {/* {pickWinner(raffleParticipants)} */}
    </div>
  );
};

export default PickRaffleWinner;
