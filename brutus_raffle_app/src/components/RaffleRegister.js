import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useInput } from "../util/customHooks";
import Button from "@material-ui/core/Button";
import axios from "axios";
import NavBar from "./NavBar";

const RaffleRegister = () => {
  const [raffleInfo, setRaffleInfo] = useState([]);
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const phoneNumber = useInput("");
  const params = useParams("/raffle/:id");
  const { id } = params;

  useEffect(() => {
    const fetchRaffle = async () => {
      try {
        let res = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/${id}`
        );
        setRaffleInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRaffle();
  }, []);

  const handleRaffleParticipant = async (e) => {
    e.preventDefault();
    const newRaffleParticipant = {
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      phone: phoneNumber.value,
    };
    try {
      await axios.post(
        `https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/${id}/participants`,
        newRaffleParticipant
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <NavBar />
      <div>
        <form onSubmit={handleRaffleParticipant}>
          <label>
            First Name:
            <input type="text" {...firstName} required />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" {...lastName} required />
          </label>
          <br />
          <label>
            Email:
            <input type="text" {...email} required />
          </label>
          <br />
          <label>
            Number:
            <input type="text" {...phoneNumber} />
          </label>
          <br />
          <Button type="submit" variant="contained" color="primary">
            Register for Raffle
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RaffleRegister;
