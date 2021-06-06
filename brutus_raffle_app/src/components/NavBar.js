import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";

const NavBar = () => {
  const [raffleInfo, setRaffleInfo] = useState([]);
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
  return (
    <div>
      <h3>{raffleInfo.name}</h3>

      <NavLink exact to={"/"}>
        <Button variant="contained" color="primary">
          Raffle Home
        </Button>
      </NavLink>

      <NavLink exact to={`/raffles/${id}/`}>
        <Button variant="contained" color="primary">
          Register
        </Button>
      </NavLink>

      <NavLink to={`/raffles/${id}/participants`}>
        <Button variant="contained" color="primary">
          Participants
        </Button>
      </NavLink>

      <NavLink to={`/raffles/${id}/winner`}>
        <Button variant="contained" color="primary">
          Pick Winner
        </Button>
      </NavLink>
    </div>
  );
};

export default NavBar;
