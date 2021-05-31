import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
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
      <Tabs>
        <Tab>
          <NavLink exact to={"/"}>
            <button>Raffle Home</button>
          </NavLink>
        </Tab>
        <Tab>
          <NavLink exact to={`/raffles/${id}/`}>
            <button>Register</button>
          </NavLink>
        </Tab>
        <Tab>
          <NavLink to={`/raffles/${id}/participants`}>
            <button>Participants</button>
          </NavLink>
        </Tab>
        <Tab>
          <NavLink to={`/raffles/${id}/winner`}>
            <button>Pick Winner</button>
          </NavLink>
        </Tab>
      </Tabs>
    </div>
  );
};

export default NavBar;
