import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import parse from "html-react-parser";

import { getEpisodes } from "./api/episodesService";
import { formatSeasons } from "./utils/formatSeasons";

import Episodes from "./components/Episodes";
import "./styles.css";

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const episodes = seasons[selectedSeason] || [];

  useEffect(() => {
    getEpisodes()
      .then(res => {
        console.log(res.data);
        setShow(res.data);
        setSeasons(formatSeasons(res.data._embedded.episodes));
      })
      .catch(err => console.log(err));
  }, []);

  const handleSelect = e => {
    setSelectedSeason(e.value);
  };

  if (!show) {
    return <h2 style={{color:'white'}}>Fetching data...</h2>;
  }

  return (
    <div className="App">
      {console.log(show)}
      <img className="poster-img" src={show.image.original} alt={show.name} />
      <h1>{show.name}</h1>
      <p className="show-summary">{parse(show.summary)}</p>
      <Dropdown
        data-testid="dropDown"
        options={Object.keys(seasons)}
        onChange={handleSelect}
        value={selectedSeason || "Select a season"}
        placeholder="Select an option"
      />
      <Episodes episodes={episodes} />
    </div>
  );
}
