import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";

const RaffleParticipants = () => {
  const [raffleParticipants, setRaffleParticipants] = useState([]);
  const params = useParams("/raffle/:id");
  const { id } = params;
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        let res = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://raffle-fs-app.herokuapp.com/api/raffles/${id}/participants`
        );
        setRaffleParticipants(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchParticipants();
  }, []);

  let allRaffleParticipants = raffleParticipants.map((participant, i) => {
    return (
      <li key={i}>
        <h3>
          {participant.firstname} {participant.lastname}
        </h3>
        <p>{participant.id}</p>
        <p>{participant.email}</p>
        <p>{participant.phone ? participant.phone : "none"}</p>
      </li>
    );
  });

  return (
    <div>
      <NavBar></NavBar>
      <h1>Raffle Participants</h1>
      <ul>{allRaffleParticipants}</ul>
    </div>
  );
};

export default RaffleParticipants;
