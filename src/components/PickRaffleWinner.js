import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInput } from "../util/customHooks";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import axios from "axios";
import NavBar from "./NavBar";
import winnerimg from "../assets/winnerimg.png";

const PickRaffleWinner = () => {
  const [raffleSecretToken, setRaffleSecretToken] = useState("");
  const [raffleParticipants, setRaffleParticipants] = useState([""]);
  const [raffleWinner, setRaffleWinner] = useState({});
  const [isWinner, setIsWinner] = useState(false);
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
    const isEmpty = (obj) => {
      return Object.keys(obj).length === 0;
    };

    const getWinner = async () => {
      try {
        let res = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/${id}/winner`
        );
        if (!isEmpty(res.data)) {
          setRaffleWinner(res.data);
          setIsWinner(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getWinner();
  }, [isWinner]);

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

  return (
    <div>
      <NavBar />

      {isWinner ? (
        <div>
          <h3>We Have a Winner!!!</h3>
          <Card>
            <img src={winnerimg} />
            <h4>
              {raffleWinner.firstname} {raffleWinner.lastname}
            </h4>
            <p>{raffleWinner.id}</p>
            <p>{raffleWinner.email}</p>
            <p>{raffleWinner.phone}</p>
          </Card>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default PickRaffleWinner;
