import React, { useState } from "react";
import { fetchEpisodes, fetchLocations } from "../api";
import "./Rick.css";

const Rick = () => {
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const loadEpisodes = () => {
    fetchEpisodes().then((data) => setEpisodes(data));
  };

  const loadLocations = () => {
    fetchLocations().then((data) => setLocations(data));
  };

  return (
    <div className="rick-container">
      <div className="tabs-container">
        <button
          className={`tab ${selectedTab === "episodes" ? "active" : ""}`}
          onClick={() => handleTabClick("episodes")}
        >
          Эпизоды
        </button>
        <button
          className={`tab ${selectedTab === "locations" ? "active" : ""}`}
          onClick={() => handleTabClick("locations")}
        >
          Локации
        </button>
      </div>
      <div className="content-container">
        {selectedTab === "episodes" && (
          <div className="episodes-container">
            <h2>Эпизоды</h2>
            <button onClick={loadEpisodes}>Загрузить эпизоды</button>
            {episodes.map((episode) => (
              <div key={episode.id} className="episode">
                <h3>{episode.name}</h3>
                <p>{episode.air_date}</p>
              </div>
            ))}
          </div>
        )}
        {selectedTab === "locations" && (
          <div className="locations-container">
            <h2>Локации</h2>
            <button onClick={loadLocations}>Загрузить локации</button>
            {locations.map((location) => (
              <div key={location.id} className="location">
                <h3>{location.name}</h3>
                <p>{location.type}</p>
                <p>{location.dimension}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rick;
