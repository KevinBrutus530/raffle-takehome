import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInput } from "../util/customHooks";
import cors from "cors";
import axios from "axios";

const RaffleHome = () => {
  const raffleName = useInput("");
  const secretToken = useInput("");
  const [allRaffles, setAllRaffles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(
          "https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/"
        );
        setAllRaffles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleInput = (e, setValue) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  let currentRaffles = allRaffles.map((raffle, i) => {
    return (
      <Link key={i} to={`/raffles/${raffle.id}`}>
        <li>
          <button>
            <h3>{raffle.name}</h3>
            <p>Created on: {raffle.created_at}</p>
            <p>
              Winner ID:
              {raffle.winner_id === null ? "None Selected" : raffle.winner_id}
            </p>
            <p>
              Raffled On:
              {raffle.raffled_at === null
                ? "Not Yet Raffled"
                : raffle.raffled_at}
            </p>
          </button>
        </li>
      </Link>
    );
  });

  return (
    <div>
      <h1>Get Ready to Raffle!!!</h1>

      <div>
        <h2>Create New Raffle:</h2>
        <form>
          <label>
            Raffle Name:
            <input
              type="text"
              {...raffleName}
              placeholder="Raffle Name"
              required
            />
          </label>
          <br />
          <label>
            Secret Token:
            <input
              type="text"
              {...secretToken}
              placeholder="Secret Token"
              required
            />
          </label>
          <br />
          <p>
            You must remember the Raffle Token because it will be asked when
            picking a winner
          </p>
          <br />
          <button type="submit">Create Raffle</button>
        </form>
        <div>
          <h2>All Raffles</h2>
          <ul>{currentRaffles}</ul>
        </div>
      </div>
    </div>
  );
};

export default RaffleHome;
