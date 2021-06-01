import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import NavBar from "./NavBar";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    // height: "20em",
    // width: "50%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const RaffleParticipants = () => {
  const [raffleParticipants, setRaffleParticipants] = useState([]);
  const params = useParams("/raffle/:id");
  const { id } = params;
  const classes = useStyles();

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
      <Card key={i} className={classes.root}>
        <li>
          <h3>
            {participant.firstname} {participant.lastname}
          </h3>
          <p>{participant.id}</p>
          <p>{participant.email}</p>
          <p>{participant.phone ? participant.phone : "none"}</p>
        </li>
      </Card>
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
